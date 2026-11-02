import os
from pathlib import Path
from dotenv import load_dotenv

# Search for .env in current directory or parent directory
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

# Local LLM Configuration (OpenAI-compatible)
LOCAL_LLM_MODEL = os.getenv("LOCAL_LLM_MODEL", "nvidia/nemotron-3-nano-4b")
LOCAL_LLM_BASE_URL = os.getenv("LOCAL_LLM_BASE_URL", "http://127.0.0.1:1234/v1")
LOCAL_LLM_API_KEY = os.getenv("LOCAL_LLM_API_KEY", "not-needed")
LOCAL_LLM_TEMPERATURE = float(os.getenv("LOCAL_LLM_TEMPERATURE", "0.2"))

# Local Embedding Model Configuration
LOCAL_EMBEDDING_MODEL = os.getenv("LOCAL_EMBEDDING_MODEL", "text-embedding-nomic-embed-text-v1.5")
LOCAL_EMBEDDING_BASE_URL = os.getenv("LOCAL_EMBEDDING_BASE_URL", "http://127.0.0.1:1234/v1")
LOCAL_EMBEDDING_API_KEY = os.getenv("LOCAL_EMBEDDING_API_KEY", "not-needed")

# Paths and Vector Store
CHROMA_PERSIST_DIRECTORY = os.getenv(
    "CHROMA_PERSIST_DIRECTORY",
    str(BASE_DIR / "backend" / "chroma_db")
)
RESULTS_DIRECTORY = os.getenv(
    "RESULTS_DIRECTORY",
    str(BASE_DIR / "results")
)

# API Server
BACKEND_HOST = os.getenv("BACKEND_HOST", "127.0.0.1")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", "8000"))
