# RoleRadar RAG Backend

A Retrieval-Augmented Generation (RAG) backend for RoleRadar built using **LangChain**, **LangGraph**, and **ChromaDB**, powered locally by:
- **LLM**: `nvidia/nemotron-3-nano-4b` (LM Studio endpoint `http://127.0.0.1:1234/v1`)
- **Embeddings**: `text-embedding-nomic-embed-text-v1.5` (LM Studio endpoint `http://127.0.0.1:1234/v1`)

---

## Architecture Overview

```
                      +-----------------------------+
                      |   results/*.json (Raw Jobs)  |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |    backend/loader.py        |
                      | (Normalizer & Preprocessor) |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |    backend/vectorstore.py   |
                      |   ChromaDB + Nomic Embed    |
                      +--------------+--------------+
                                     |
             +-----------------------+-----------------------+
             |                                               |
             v                                               v
+---------------------------+                 +---------------------------+
|  backend/rag_graph.py     |                 |      backend/api.py       |
|  LangGraph Workflow:      |                 |    FastAPI REST Server    |
|  - retrieve               | <============== |  - POST /api/rag/query    |
|  - format_context         |                 |  - POST /api/rag/index    |
|  - generate (nemotron-3)  |                 |  - GET  /api/rag/health   |
+---------------------------+                 +---------------------------+
```

---

## Directory Structure

```
backend/
├── __init__.py           # Package marker
├── config.py             # Environment configuration and defaults
├── loader.py             # Normalizes multiple job JSON formats & HTML stripping
├── vectorstore.py        # Chroma persistent vector store & local embeddings
├── rag_graph.py          # LangGraph StateGraph (retrieve -> format -> generate)
├── api.py                # FastAPI REST API with CORS enabled
├── test_rag.py           # CLI test runner for end-to-end RAG verification
├── requirements.txt      # Python dependencies
└── README.md             # This documentation
```

---

## Configuration (`.env`)

The system reads configurations from `.env` in the repository root:

```bash
# Local LLM & Embedding Settings (LM Studio / OpenAI-Compatible)
LOCAL_LLM_MODEL=nvidia/nemotron-3-nano-4b
LOCAL_LLM_BASE_URL=http://127.0.0.1:1234/v1
LOCAL_LLM_API_KEY=not-needed

LOCAL_EMBEDDING_MODEL=text-embedding-nomic-embed-text-v1.5
LOCAL_EMBEDDING_BASE_URL=http://127.0.0.1:1234/v1
LOCAL_EMBEDDING_API_KEY=not-needed

# RAG & Storage Configuration
CHROMA_PERSIST_DIRECTORY=./backend/chroma_db
RESULTS_DIRECTORY=./results

# Server Configuration
BACKEND_HOST=127.0.0.1
BACKEND_PORT=8000
```

---

## Quick Start

### 1. Activate Environment and Install Dependencies

```bash
# Activate existing virtual environment
source .venv/bin/activate

# Or install dependencies
pip install -r backend/requirements.txt
```

### 2. Run Test Suite (Local Verification)

```bash
# Run automated tests against indexed jobs
python -m backend.test_rag --reindex

# Run custom career queries
python -m backend.test_rag --query "Which junior roles mention remote work and what are their locations?"
```

### 3. Start REST API Server

```bash
uvicorn backend.api:app --host 127.0.0.1 --port 8000 --reload
```

---

## API Endpoints

### `POST /api/rag/query`
Query the job repository using natural language.

**Request:**
```json
{
  "query": "Find me junior .NET developer roles with remote options.",
  "top_k": 3
}
```

**Response:**
```json
{
  "question": "Find me junior .NET developer roles with remote options.",
  "answer": "Here are the junior .NET developer positions...",
  "reasoning": "...",
  "sources": [
    {
      "title": "Junior .NET Developer",
      "company": "Blue Rose Consulting Group, Inc.",
      "location": "Colorado Springs, CO",
      "salary": "Not specified",
      "url": "https://...",
      "score": 0.47
    }
  ]
}
```

### `GET /api/rag/health`
Verify server and vector store status.

### `POST /api/rag/index`
Trigger ingestion and indexing of JSON files from `results/`.
Pass `{"force_reindex": true}` to wipe and rebuild index.
