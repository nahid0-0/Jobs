import sys
import time
import argparse
from backend.vectorstore import index_results
from backend.rag_graph import run_rag_query

def main():
    parser = argparse.ArgumentParser(description="Test RoleRadar LangGraph RAG with local model")
    parser.add_argument("--query", type=str, default=None, help="Custom query to test")
    parser.add_argument("--top-k", type=int, default=3, help="Number of retrieved documents")
    parser.add_argument("--reindex", action="store_true", help="Force reindexing of jobs data")
    args = parser.parse_args()

    print("=" * 60)
    print("RoleRadar Local Model LangGraph RAG Test Suite")
    print("=" * 60)

    # Reindex if requested or first run
    if args.reindex:
        print("[Step 1] Force re-indexing documents from results/ directory...")
        count = index_results(force_reindex=True)
        print(f"Indexed {count} documents.")
    else:
        print("[Step 1] Ensuring vector store is populated...")
        count = index_results(force_reindex=False)
        print(f"Vector store ready with {count} documents.")

    test_queries = [
        args.query
    ] if args.query else [
        "What remote or junior .NET developer roles are currently available?",
        "Are there any AI Engineer positions in Seattle and what company offers them?",
    ]

    for i, q in enumerate(test_queries, 1):
        print("\n" + "-" * 60)
        print(f"Test Query #{i}: \"{q}\"")
        print("-" * 60)

        start_time = time.time()
        result = run_rag_query(q, top_k=args.top_k)
        elapsed = time.time() - start_time

        print(f"\n[Retrieved {len(result['sources'])} Sources in {elapsed:.2f}s]:")
        for s in result["sources"]:
            print(f"  * {s['title']} | {s['company']} | {s['location']} | Salary: {s['salary']} (Score: {s['score']})")

        print(f"\n[Synthesized Answer from nvidia/nemotron-3-nano-4b]:\n")
        print(result["answer"])

        if result.get("reasoning"):
            print(f"\n[Model Internal Reasoning]:\n{result['reasoning']}")

    print("\n" + "=" * 60)
    print("All tests completed successfully!")
    print("=" * 60)

if __name__ == "__main__":
    main()
