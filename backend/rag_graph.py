import os
from typing import List, Dict, Any, Optional
from typing_extensions import TypedDict
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, START, END

from backend.config import (
    LOCAL_LLM_MODEL,
    LOCAL_LLM_BASE_URL,
    LOCAL_LLM_API_KEY,
    LOCAL_LLM_TEMPERATURE,
)
from backend.vectorstore import get_vectorstore

class RAGState(TypedDict, total=False):
    question: str
    top_k: int
    retrieved_docs: List[Dict[str, Any]]
    formatted_context: str
    answer: str
    reasoning: Optional[str]

def get_chat_model() -> ChatOpenAI:
    """Initialize LangChain ChatOpenAI configured for the local LLM."""
    return ChatOpenAI(
        model=LOCAL_LLM_MODEL,
        base_url=LOCAL_LLM_BASE_URL,
        api_key=LOCAL_LLM_API_KEY,
        temperature=LOCAL_LLM_TEMPERATURE,
    )

def retrieve_node(state: RAGState) -> Dict[str, Any]:
    """Retrieve relevant job postings from Chroma vector store."""
    query = state.get("question", "")
    top_k = state.get("top_k", 4)

    store = get_vectorstore()
    raw_results = store.similarity_search_with_relevance_scores(query, k=top_k)

    retrieved = []
    for doc, score in raw_results:
        retrieved.append({
            "title": doc.metadata.get("title", "Unknown Title"),
            "company": doc.metadata.get("company", "Unknown Company"),
            "location": doc.metadata.get("location", "Not specified"),
            "salary": doc.metadata.get("salary", "Not specified"),
            "url": doc.metadata.get("url", ""),
            "source": doc.metadata.get("source", ""),
            "score": round(float(score), 4),
            "content": doc.page_content,
        })

    return {"retrieved_docs": retrieved}

def format_context_node(state: RAGState) -> Dict[str, Any]:
    """Format retrieved jobs into structured text for prompt context."""
    docs = state.get("retrieved_docs", [])
    if not docs:
        return {"formatted_context": "No relevant job postings found."}

    context_blocks = []
    for i, d in enumerate(docs, 1):
        block = (
            f"[Job #{i}]\n"
            f"Title: {d['title']}\n"
            f"Company: {d['company']}\n"
            f"Location: {d['location']}\n"
            f"Salary: {d['salary']}\n"
            f"URL: {d['url']}\n"
            f"Content Excerpt:\n{d['content'][:800]}..."
        )
        context_blocks.append(block)

    formatted = "\n\n---\n\n".join(context_blocks)
    return {"formatted_context": formatted}

def generate_node(state: RAGState) -> Dict[str, Any]:
    """Generate synthesized, grounded response using local LLM."""
    question = state.get("question", "")
    context = state.get("formatted_context", "")

    system_prompt = (
        "You are RoleRadar's AI Career Assistant and Job Matching Specialist.\n"
        "Your task is to provide accurate, helpful, and concise answers based on the retrieved job postings below.\n"
        "Guidelines:\n"
        "- Base your answers strictly on the provided job listings.\n"
        "- Include job titles, companies, locations, and salaries whenever relevant.\n"
        "- If the query asks for skills or requirements, highlight the specific technologies mentioned.\n"
        "- If no matching jobs are found, clearly inform the user."
    )

    user_prompt = (
        f"Context of retrieved job postings:\n"
        f"---------------------\n"
        f"{context}\n"
        f"---------------------\n\n"
        f"User Inquiry: {question}\n\n"
        f"Please provide a structured, helpful answer:"
    )

    llm = get_chat_model()
    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_prompt),
    ])

    # Extract reasoning if model emits reasoning_content
    reasoning = None
    if hasattr(response, "additional_kwargs") and response.additional_kwargs:
        reasoning = response.additional_kwargs.get("reasoning_content")

    return {
        "answer": response.content,
        "reasoning": reasoning,
    }

def create_rag_graph():
    """Build and compile LangGraph state workflow."""
    workflow = StateGraph(RAGState)

    workflow.add_node("retrieve", retrieve_node)
    workflow.add_node("format_context", format_context_node)
    workflow.add_node("generate", generate_node)

    workflow.add_edge(START, "retrieve")
    workflow.add_edge("retrieve", "format_context")
    workflow.add_edge("format_context", "generate")
    workflow.add_edge("generate", END)

    return workflow.compile()

# Singleton compiled graph instance
rag_graph = create_rag_graph()

def run_rag_query(question: str, top_k: int = 4) -> Dict[str, Any]:
    """Execute query against the LangGraph RAG pipeline."""
    initial_state: RAGState = {
        "question": question,
        "top_k": top_k,
    }
    result = rag_graph.invoke(initial_state)
    return {
        "question": result.get("question"),
        "answer": result.get("answer"),
        "reasoning": result.get("reasoning"),
        "sources": [
            {
                "title": doc["title"],
                "company": doc["company"],
                "location": doc["location"],
                "salary": doc["salary"],
                "url": doc["url"],
                "score": doc["score"],
            }
            for doc in result.get("retrieved_docs", [])
        ],
    }
