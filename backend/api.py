import os
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.config import (
    LOCAL_LLM_MODEL,
    LOCAL_LLM_BASE_URL,
    LOCAL_EMBEDDING_MODEL,
    LOCAL_EMBEDDING_BASE_URL,
    RESULTS_DIRECTORY,
)
from backend.vectorstore import get_vectorstore, index_results
from backend.rag_graph import run_rag_query

app = FastAPI(
    title="RoleRadar RAG Backend",
    description="LangChain and LangGraph powered RAG API for RoleRadar jobs data using local models.",
    version="1.0.0",
)

# Enable CORS for local frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str = Field(..., description="User query or career search request", example="What remote junior .NET developer jobs are available?")
    top_k: int = Field(4, description="Number of top job postings to retrieve", ge=1, le=20)

class JobSource(BaseModel):
    title: str
    company: str
    location: str
    salary: str
    url: str
    score: float

class QueryResponse(BaseModel):
    question: str
    answer: str
    reasoning: Optional[str] = None
    sources: List[JobSource]

class IndexRequest(BaseModel):
    force_reindex: bool = Field(False, description="Whether to clear and rebuild vector index from scratch")

class IndexResponse(BaseModel):
    status: str
    indexed_documents: int

@app.get("/api/rag/health")
def health():
    """Health check endpoint checking vector store and local model configuration."""
    try:
        store = get_vectorstore()
        doc_count = store._collection.count()
    except Exception as e:
        doc_count = 0

    return {
        "status": "healthy",
        "llm_model": LOCAL_LLM_MODEL,
        "llm_endpoint": LOCAL_LLM_BASE_URL,
        "embedding_model": LOCAL_EMBEDDING_MODEL,
        "embedding_endpoint": LOCAL_EMBEDDING_BASE_URL,
        "indexed_jobs_count": doc_count,
    }

@app.get("/api/rag/stats")
def stats():
    """Retrieve vector store and indexing statistics."""
    store = get_vectorstore()
    doc_count = store._collection.count()
    return {
        "indexed_documents": doc_count,
        "results_directory": RESULTS_DIRECTORY,
        "llm_model": LOCAL_LLM_MODEL,
        "embedding_model": LOCAL_EMBEDDING_MODEL,
    }

@app.post("/api/rag/index", response_model=IndexResponse)
def trigger_index(payload: Optional[IndexRequest] = None):
    """Trigger document indexing from results/ into Chroma vector store."""
    force = payload.force_reindex if payload else False
    try:
        count = index_results(force_reindex=force)
        return IndexResponse(status="success", indexed_documents=count)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/rag/query", response_model=QueryResponse)
def query_rag(payload: QueryRequest):
    """Execute LangGraph RAG query across job documents."""
    if not payload.query or not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    try:
        result = run_rag_query(payload.query, top_k=payload.top_k)
        return QueryResponse(
            question=result["question"],
            answer=result["answer"],
            reasoning=result.get("reasoning"),
            sources=[JobSource(**s) for s in result.get("sources", [])],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG execution error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    from backend.config import BACKEND_HOST, BACKEND_PORT
    uvicorn.run("backend.api:app", host=BACKEND_HOST, port=BACKEND_PORT, reload=False)
