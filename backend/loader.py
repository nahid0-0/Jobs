import os
import json
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from langchain_core.documents import Document

def clean_html(text: str) -> str:
    """Strip basic HTML tags and excessive whitespace."""
    if not text:
        return ""
    clean = re.sub(r"<[^>]+>", " ", text)
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean

def normalize_job_dict(item: Dict[str, Any], default_source: str = "Unknown") -> Optional[Dict[str, Any]]:
    """Normalize varied job dictionary structures into a unified schema."""
    if not isinstance(item, dict):
        return None

    # Title
    title = item.get("title") or item.get("jobTitle") or "Untitled Position"
    if not title or title.strip() == "":
        return None

    # Company
    company = item.get("company") or item.get("companyName")
    if not company and isinstance(item.get("companyDetails"), dict):
        company = item.get("companyDetails", {}).get("companyName")
    if not company:
        company = "Unknown Company"

    # Location
    location = item.get("location") or item.get("formattedLocation")
    if isinstance(location, dict):
        formatted_loc = location.get("formatted")
        if isinstance(formatted_loc, dict):
            location = formatted_loc.get("long") or formatted_loc.get("short")
        elif not location.get("city") and location.get("fullAddress"):
            location = location.get("fullAddress")
        elif location.get("city"):
            state = location.get("state") or location.get("admin1Code") or ""
            country = location.get("countryName") or location.get("countryCode") or ""
            parts = [p for p in [location.get("city"), state, country] if p]
            location = ", ".join(parts)
        else:
            location = str(location)
    if not location:
        location = "Remote / Unspecified"

    # Salary
    salary = item.get("salary")
    if isinstance(salary, dict):
        salary = salary.get("formattedSalary") or salary.get("salaryText") or str(salary)
    elif not salary:
        salary = "Not specified"

    # URL
    url = (
        item.get("url")
        or item.get("applyUrl")
        or item.get("link")
        or item.get("viewJobLink")
        or item.get("originalApplyUrl")
        or ""
    )

    # Source
    source = item.get("source") or item.get("jobSourceName") or default_source

    # Date
    date = item.get("date") or item.get("postedAt") or item.get("pubDate") or ""

    # Seniority & Employment Type
    seniority = item.get("seniorityLevel") or item.get("seniority") or ""
    emp_type = item.get("employmentType") or item.get("jobTypes") or ""
    if isinstance(emp_type, list):
        emp_type = ", ".join(str(e) for e in emp_type)

    # Tags / Skills
    tags = item.get("tags") or item.get("attributes") or item.get("occupations") or []
    if isinstance(tags, list):
        tags_str = ", ".join(str(t) for t in tags)
    else:
        tags_str = str(tags) if tags else ""

    # Description
    desc = (
        item.get("descriptionText")
        or item.get("description")
        or item.get("jobDescription")
        or clean_html(item.get("descriptionHtml") or item.get("jobDescriptionHTML") or "")
    )
    if not desc or len(desc.strip()) < 10:
        desc = "No detailed description provided."

    job_id = str(item.get("id") or item.get("refId") or f"{company}-{title}".replace(" ", "_"))

    return {
        "id": job_id,
        "title": str(title).strip(),
        "company": str(company).strip(),
        "location": str(location).strip(),
        "salary": str(salary).strip(),
        "url": str(url).strip(),
        "source": str(source).strip(),
        "date": str(date).strip(),
        "seniority": str(seniority).strip(),
        "employment_type": str(emp_type).strip(),
        "tags": tags_str.strip(),
        "description": str(desc).strip(),
    }

def format_job_to_document(job: Dict[str, Any], file_origin: str = "") -> Document:
    """Format normalized job dictionary into a searchable LangChain Document."""
    content = f"""Role: {job['title']}
Company: {job['company']}
Location: {job['location']}
Salary: {job['salary']}
Employment Type: {job['employment_type'] or 'Standard'}
Seniority: {job['seniority'] or 'Not specified'}
Skills/Tags: {job['tags'] or 'None listed'}
Source: {job['source']}
URL: {job['url']}

Job Description:
{job['description']}
""".strip()

    metadata = {
        "id": job["id"],
        "title": job["title"],
        "company": job["company"],
        "location": job["location"],
        "salary": job["salary"],
        "url": job["url"],
        "source": job["source"],
        "date": job["date"],
        "file_origin": file_origin,
    }

    return Document(page_content=content, metadata=metadata)

def load_jobs_from_directory(results_dir: str) -> List[Document]:
    """Scan the results folder, parse all json files, deduplicate, and return LangChain Documents."""
    p = Path(results_dir)
    if not p.exists() or not p.is_dir():
        return []

    documents: List[Document] = []
    seen_keys = set()

    for file_path in p.glob("*.json"):
        source_hint = file_path.stem.replace("_", " ").title()
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            items = data if isinstance(data, list) else [data]
            for raw_item in items:
                normalized = normalize_job_dict(raw_item, default_source=source_hint)
                if not normalized:
                    continue

                # Deduplicate based on title + company + location
                unique_key = (
                    normalized["title"].lower(),
                    normalized["company"].lower(),
                    normalized["location"].lower()
                )
                if unique_key in seen_keys:
                    continue
                seen_keys.add(unique_key)

                doc = format_job_to_document(normalized, file_origin=file_path.name)
                documents.append(doc)

        except Exception as e:
            print(f"[Loader] Error processing file {file_path.name}: {e}")

    return documents
