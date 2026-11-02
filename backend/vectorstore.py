import os
from typing import List, Optional, Tuple
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

from backend.config import (
    LOCAL_EMBEDDING_MODEL,
    LOCAL_EMBEDDING_BASE_URL,
    LOCAL_EMBEDDING_API_KEY,
    CHROMA_PERSIST_DIRECTORY,
    RESULTS_DIRECTORY,
)
from backend.loader import load_jobs_from_directory

_vectorstore_instance: Optional[Chroma] = None

def get_embedding_function() -> OpenAIEmbeddings:
    """Return LangChain OpenAIEmbeddings configured for local embedding model."""
    return OpenAIEmbeddings(
        model=LOCAL_EMBEDDING_MODEL,
        base_url=LOCAL_EMBEDDING_BASE_URL,
        api_key=LOCAL_EMBEDDING_API_KEY,
        check_embedding_ctx_length=False,
    )

def get_vectorstore(persist_directory: Optional[str] = None) -> Chroma:
    """Retrieve or initialize singleton Chroma vector store."""
    global _vectorstore_instance
    if _vectorstore_instance is not None:
        return _vectorstore_instance

    target_dir = persist_directory or CHROMA_PERSIST_DIRECTORY
    embeddings = get_embedding_function()

    _vectorstore_instance = Chroma(
        collection_name="role_radar_jobs",
        embedding_function=embeddings,
        persist_directory=target_dir,
    )
    return _vectorstore_instance

def index_results(force_reindex: bool = False) -> int:
    """Index job results from results directory into Chroma."""
    global _vectorstore_instance
    store = get_vectorstore()

    # If force re-index, clear existing collection documents
    if force_reindex:
        try:
            store.delete_collection()
            _vectorstore_instance = None
            store = get_vectorstore()
        except Exception as e:
            print(f"[Vectorstore] Warning during delete collection: {e}")

    # Check count in collection
    existing_count = store._collection.count()
    if existing_count > 0 and not force_reindex:
        print(f"[Vectorstore] Existing index found with {existing_count} documents.")
        return existing_count

    documents = load_jobs_from_directory(RESULTS_DIRECTORY)
    if not documents:
        print("[Vectorstore] No documents found to index.")
        return 0

    print(f"[Vectorstore] Indexing {len(documents)} job postings...")
    store.add_documents(documents)
    total = store._collection.count()
    print(f"[Vectorstore] Indexing complete. Total indexed documents: {total}")
    return total

def search_similar_jobs(query: str, k: int = 4) -> List[Tuple[Document, float]]:
    """Perform similarity search with relevance scores."""
    store = get_vectorstore()
    return store.similarity_search_with_relevance_scores(query, k=k)
