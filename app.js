// Minimalist vanilla JS for Split-Screen Job Search Launcher with Gemini AI & Apify
const APIFY_TOKEN = (window.ENV && window.ENV.APIFY_TOKEN) || "";
const GEMINI_API_KEY = (window.ENV && window.ENV.GEMINI_API_KEY) || "";

// Global job store - starts completely clean without dummy items
// Platform Logo SVGs (All 5 platforms)
const LINKEDIN_ICON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>`;
const LINKEDIN_ICON_MD = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>`;

const INDEED_ICON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M11.566 21.5c-3.79 0-7.066-2.92-7.066-7.39 0-4.63 3.63-7.51 7.15-7.51 3.51 0 6.98 2.88 6.98 7.51 0 4.47-3.27 7.39-7.064 7.39zm.08-12.75c-2.47 0-4.92 1.95-4.92 5.36 0 3.32 2.37 5.25 4.92 5.25 2.56 0 4.84-1.93 4.84-5.25 0-3.41-2.36-5.36-4.84-5.36zM13.67 4.2c.45-.63 1.1-.96 1.87-.96 1.19 0 2.15.8 2.15 2.13v.13h-2.07v-.13c0-.35-.22-.61-.59-.61-.26 0-.49.13-.67.39l-.69 1.05-1.74 2.65h-2.27l2.84-4.27.17-.38z"/></svg>`;
const INDEED_ICON_MD = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.566 21.5c-3.79 0-7.066-2.92-7.066-7.39 0-4.63 3.63-7.51 7.15-7.51 3.51 0 6.98 2.88 6.98 7.51 0 4.47-3.27 7.39-7.064 7.39zm.08-12.75c-2.47 0-4.92 1.95-4.92 5.36 0 3.32 2.37 5.25 4.92 5.25 2.56 0 4.84-1.93 4.84-5.25 0-3.41-2.36-5.36-4.84-5.36zM13.67 4.2c.45-.63 1.1-.96 1.87-.96 1.19 0 2.15.8 2.15 2.13v.13h-2.07v-.13c0-.35-.22-.61-.59-.61-.26 0-.49.13-.67.39l-.69 1.05-1.74 2.65h-2.27l2.84-4.27.17-.38z"/></svg>`;

const GLASSDOOR_ICON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`;
const GLASSDOOR_ICON_MD = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`;

const GOOGLE_ICON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>`;
const GOOGLE_ICON_MD = `<svg width="15" height="15" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>`;

const ZIPRECRUITER_ICON_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9.5 5 12l7-5.5L19 12l3-2.5L12 2zm0 6.5L5 14l3 2.5 4-3.5 4 3.5 3-2.5-7-5.5zm0 6.5L8 18.5 12 22l4-3.5-4-3.5z"/></svg>`;
const ZIPRECRUITER_ICON_MD = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9.5 5 12l7-5.5L19 12l3-2.5L12 2zm0 6.5L5 14l3 2.5 4-3.5 4 3.5 3-2.5-7-5.5zm0 6.5L8 18.5 12 22l4-3.5-4-3.5z"/></svg>`;

function getPlatformMeta(source) {
  const s = (source || "").toLowerCase();
  if (s.includes("linkedin")) {
    return { name: "LinkedIn", key: "linkedin", iconSm: LINKEDIN_ICON_SVG, iconMd: LINKEDIN_ICON_MD, applyClass: "apply-linkedin" };
  } else if (s.includes("indeed")) {
    return { name: "Indeed", key: "indeed", iconSm: INDEED_ICON_SVG, iconMd: INDEED_ICON_MD, applyClass: "apply-indeed" };
  } else if (s.includes("glassdoor")) {
    return { name: "Glassdoor", key: "glassdoor", iconSm: GLASSDOOR_ICON_SVG, iconMd: GLASSDOOR_ICON_MD, applyClass: "apply-glassdoor" };
  } else if (s.includes("google")) {
    return { name: "Google Jobs", key: "google", iconSm: GOOGLE_ICON_SVG, iconMd: GOOGLE_ICON_MD, applyClass: "apply-google" };
  } else if (s.includes("zip")) {
    return { name: "ZipRecruiter", key: "ziprecruiter", iconSm: ZIPRECRUITER_ICON_SVG, iconMd: ZIPRECRUITER_ICON_MD, applyClass: "apply-ziprecruiter" };
  }
  return { name: source || "Web", key: "linkedin", iconSm: LINKEDIN_ICON_SVG, iconMd: LINKEDIN_ICON_MD, applyClass: "apply-linkedin" };
}

let jobs = [];
let selectedJobId = null;

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const kwInput = document.getElementById("kw");
  const locInput = document.getElementById("loc");
  const expSelect = document.getElementById("exp");
  const jtSelect = document.getElementById("jt");
  const fetchCountInput = document.getElementById("fetch-count");
  const rfInput = document.getElementById("rf");
  const rsSelect = document.getElementById("rs");
  const jobListEl = document.getElementById("job-list");
  const resultsCountEl = document.getElementById("results-count");
  
  const urlLinkedIn = document.getElementById("url-linkedin");
  const urlIndeed = document.getElementById("url-indeed");
  const urlGlassdoor = document.getElementById("url-glassdoor");
  const urlGoogle = document.getElementById("url-google");
  const urlZiprecruiter = document.getElementById("url-ziprecruiter");

  const paramsLinkedIn = document.getElementById("params-linkedin");
  const paramsIndeed = document.getElementById("params-indeed");
  const paramsGlassdoor = document.getElementById("params-glassdoor");
  const paramsGoogle = document.getElementById("params-google");
  const paramsZiprecruiter = document.getElementById("params-ziprecruiter");

  const btnRunSearch = document.getElementById("btn-run-search");
  const searchBtnText = document.getElementById("search-btn-text");
  const searchBtnIcon = document.getElementById("search-btn-icon");
  const notificationBanner = document.getElementById("notification-banner");
  const notificationText = document.getElementById("notification-text");
  const notificationSpinner = document.getElementById("notification-spinner");

  // AI Elements
  const aiPromptInput = document.getElementById("ai-prompt-input");
  const btnGenerateAi = document.getElementById("btn-generate-ai");
  const aiBtnText = document.getElementById("ai-btn-text");
  const aiStatusMsg = document.getElementById("ai-status-msg");

  // 1. Build Query String
  function getActiveSegment(groupId) {
    const active = document.querySelector(`#${groupId} .segment-btn.active`);
    return active ? active.dataset.val : "any";
  }

  function setActiveSegment(groupId, val) {
    const group = document.getElementById(groupId);
    if (!group) return;
    const btns = group.querySelectorAll(".segment-btn");
    btns.forEach(b => {
      b.classList.toggle("active", b.dataset.val === val);
    });
  }

  function getTags(containerId) {
    const chips = document.querySelectorAll(`#${containerId} .chip`);
    return Array.from(chips).map(c => {
      const clone = c.cloneNode(true);
      const btn = clone.querySelector("button");
      if (btn) btn.remove();
      return clone.textContent.trim();
    }).filter(Boolean);
  }

  function getConstructedQuery() {
    const kw = kwInput.value.trim();
    const mustTags = getTags("chips-must");
    const anyTags = getTags("chips-any");
    const excludeTags = getTags("chips-exclude");

    let fullQuery = kw;
    if (mustTags.length > 0) {
      fullQuery += " " + mustTags.map(t => `"${t}"`).join(" ");
    }
    if (anyTags.length > 0) {
      fullQuery += " (" + anyTags.map(t => `"${t}"`).join(" OR ") + ")";
    }
    if (excludeTags.length > 0) {
      fullQuery += " " + excludeTags.map(t => `NOT "${t}"`).join(" ");
    }
    return fullQuery;
  }

  function updateUrls() {
    const fullQuery = getConstructedQuery();
    const loc = locInput.value.trim();
    const workType = getActiveSegment("group-worktype");
    const posted = getActiveSegment("group-posted");
    const exp = expSelect.value;
    const jt = jtSelect.value;

    // --- 1. LinkedIn ---
    const liParams = new URLSearchParams();
    liParams.set("keywords", fullQuery);
    if (loc && loc.toLowerCase() !== "worldwide") liParams.set("location", loc);
    if (workType === "remote") liParams.set("f_WT", "2");
    else if (workType === "hybrid") liParams.set("f_WT", "3");
    else if (workType === "onsite") liParams.set("f_WT", "1");

    if (posted === "24h") liParams.set("f_TPR", "r86400");
    else if (posted === "week") liParams.set("f_TPR", "r604800");
    else if (posted === "month") liParams.set("f_TPR", "r2592000");

    if (exp === "entry") liParams.set("f_E", "2");
    else if (exp === "associate") liParams.set("f_E", "3");
    else if (exp === "mid-senior") liParams.set("f_E", "4");
    else if (exp === "director") liParams.set("f_E", "5");

    if (jt === "full-time") liParams.set("f_JT", "F");
    else if (jt === "part-time") liParams.set("f_JT", "P");
    else if (jt === "contract") liParams.set("f_JT", "C");
    else if (jt === "internship") liParams.set("f_JT", "I");

    const liUrl = `https://www.linkedin.com/jobs/search/?${liParams.toString()}`;
    if (urlLinkedIn) {
      urlLinkedIn.textContent = liUrl;
      urlLinkedIn.title = liUrl;
    }
    if (paramsLinkedIn) {
      paramsLinkedIn.innerHTML = [
        `<span class="param-badge">keywords: "${escapeHtml(fullQuery)}"</span>`,
        loc ? `<span class="param-badge">location: "${escapeHtml(loc)}"</span>` : null,
        workType !== "any" ? `<span class="param-badge">f_WT=${liParams.get("f_WT")} (${workType})</span>` : null,
        posted !== "any" ? `<span class="param-badge">f_TPR=${liParams.get("f_TPR")} (${posted})</span>` : null
      ].filter(Boolean).join("");
    }

    // --- 2. Indeed ---
    const inParams = new URLSearchParams();
    inParams.set("q", fullQuery);
    if (workType === "remote") inParams.set("l", "Remote");
    else if (loc && loc.toLowerCase() !== "worldwide") inParams.set("l", loc);

    if (posted === "24h") inParams.set("fromage", "1");
    else if (posted === "week") inParams.set("fromage", "7");
    else if (posted === "month") inParams.set("fromage", "14");

    const inUrl = `https://www.indeed.com/jobs?${inParams.toString()}`;
    if (urlIndeed) {
      urlIndeed.textContent = inUrl;
      urlIndeed.title = inUrl;
    }
    if (paramsIndeed) {
      paramsIndeed.innerHTML = [
        `<span class="param-badge">q: "${escapeHtml(fullQuery)}"</span>`,
        inParams.get("l") ? `<span class="param-badge">l: "${escapeHtml(inParams.get("l"))}"</span>` : null,
        inParams.get("fromage") ? `<span class="param-badge">fromage: ${inParams.get("fromage")} (${posted})</span>` : null
      ].filter(Boolean).join("");
    }

    // --- 3. Glassdoor ---
    const gdUrl = `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(fullQuery)}${loc ? '&locKeyword=' + encodeURIComponent(loc) : ''}`;
    if (urlGlassdoor) {
      urlGlassdoor.textContent = gdUrl;
      urlGlassdoor.title = gdUrl;
    }
    if (paramsGlassdoor) {
      paramsGlassdoor.innerHTML = [
        `<span class="param-badge">sc.keyword: "${escapeHtml(fullQuery)}"</span>`,
        loc ? `<span class="param-badge">locKeyword: "${escapeHtml(loc)}"</span>` : null
      ].filter(Boolean).join("");
    }

    // --- 4. Google Jobs ---
    const gjQuery = `${fullQuery} ${loc || 'Remote'} jobs`;
    const gjUrl = `https://www.google.com/search?q=${encodeURIComponent(gjQuery)}&ibp=htl;jobs`;
    if (urlGoogle) {
      urlGoogle.textContent = gjUrl;
      urlGoogle.title = gjUrl;
    }
    if (paramsGoogle) {
      paramsGoogle.innerHTML = [
        `<span class="param-badge">q: "${escapeHtml(gjQuery)}"</span>`,
        `<span class="param-badge">ibp: "htl;jobs"</span>`
      ].join("");
    }

    // --- 5. ZipRecruiter ---
    const zrUrl = `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(fullQuery)}${loc ? '&location=' + encodeURIComponent(loc) : ''}`;
    if (urlZiprecruiter) {
      urlZiprecruiter.textContent = zrUrl;
      urlZiprecruiter.title = zrUrl;
    }
    if (paramsZiprecruiter) {
      paramsZiprecruiter.innerHTML = [
        `<span class="param-badge">search: "${escapeHtml(fullQuery)}"</span>`,
        loc ? `<span class="param-badge">location: "${escapeHtml(loc)}"</span>` : null
      ].filter(Boolean).join("");
    }

    // Toggle block visibility based on active platform pills
    const toggleBlock = (source, blockId) => {
      const pill = document.querySelector(`.platform-pill[data-source="${source}"]`);
      const block = document.getElementById(blockId);
      if (block) {
        block.style.display = (pill && pill.classList.contains("active")) ? "flex" : "none";
      }
    };

    toggleBlock("linkedin", "block-url-linkedin");
    toggleBlock("indeed", "block-url-indeed");
    toggleBlock("glassdoor", "block-url-glassdoor");
    toggleBlock("google", "block-url-google");
    toggleBlock("ziprecruiter", "block-url-ziprecruiter");
  }

  // 2. GEMINI AI: Describe to AI Handler
  btnGenerateAi.addEventListener("click", async () => {
    if (!GEMINI_API_KEY) {
      aiStatusMsg.style.display = "block";
      aiStatusMsg.style.color = "#b91c1c";
      aiStatusMsg.textContent = "Gemini API key missing. Please add it to config.js (see config.example.js)";
      return;
    }

    const userPrompt = aiPromptInput.value.trim();
    if (!userPrompt) {
      aiStatusMsg.style.display = "block";
      aiStatusMsg.style.color = "#b91c1c";
      aiStatusMsg.textContent = "Please enter a job description or career goal.";
      return;
    }

    btnGenerateAi.disabled = true;
    aiBtnText.textContent = "Gemini is analyzing...";
    aiStatusMsg.style.display = "block";
    aiStatusMsg.style.color = "var(--accent)";
    aiStatusMsg.textContent = "Consulting Google Gemini 2.5 Flash...";

    const systemInstruction = `You are an expert technical recruiter and job search engineer. Extract and optimize search query parameters from the user's career description for searching LinkedIn and Indeed jobs.
Return ONLY a valid JSON object matching this schema without markdown fences:
{
  "keywords": "string (main concise job title and core stack like 'Junior .NET AI')",
  "location": "string (e.g. 'Remote' or 'United States' or city)",
  "mustHave": ["array", "of", "required", "skills", "e.g. C#, .NET"],
  "anyOf": ["array", "of", "alternatives", "e.g. LLM, Copilot, LangChain"],
  "exclude": ["array", "of", "exclusions", "e.g. Senior, Lead, Staff"],
  "workType": "remote" | "hybrid" | "onsite" | "any",
  "posted": "24h" | "week" | "month" | "any",
  "experience": "entry" | "associate" | "mid-senior" | "director" | "any",
  "jobType": "full-time" | "part-time" | "contract" | "internship" | "any"
}`;

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: `${systemInstruction}\n\nUser Career Description: "${userPrompt}"` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Gemini API error ${res.status}`);
      }

      const resData = await res.json();
      const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Empty response from Gemini.");

      const aiData = JSON.parse(rawText);

      // Populate Form Fields
      if (aiData.keywords) kwInput.value = aiData.keywords;
      if (aiData.location) locInput.value = aiData.location;

      // Populate Chips
      populateChips("chips-must", aiData.mustHave || [], "must");
      populateChips("chips-any", aiData.anyOf || [], "any");
      populateChips("chips-exclude", aiData.exclude || [], "exclude");

      // Populate Segments & Dropdowns
      if (aiData.workType) setActiveSegment("group-worktype", aiData.workType);
      if (aiData.posted) setActiveSegment("group-posted", aiData.posted);
      if (aiData.experience) expSelect.value = aiData.experience;
      if (aiData.jobType) jtSelect.value = aiData.jobType;

      updateUrls();

      aiStatusMsg.style.display = "block";
      aiStatusMsg.style.color = "#15803d";
      aiStatusMsg.textContent = "✨ Search query & parameters successfully optimized by Gemini!";
      setTimeout(() => { aiStatusMsg.style.display = "none"; }, 6000);

    } catch (err) {
      console.error("Gemini Error:", err);
      aiStatusMsg.style.display = "block";
      aiStatusMsg.style.color = "#b91c1c";
      aiStatusMsg.textContent = `AI generation error: ${err.message}`;
    } finally {
      btnGenerateAi.disabled = false;
      aiBtnText.textContent = "Generate with Gemini";
    }
  });

  function populateChips(containerId, tagList, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const input = container.querySelector(".inline-tag-input");
    
    // Remove existing chips
    container.querySelectorAll(".chip").forEach(c => c.remove());

    tagList.forEach(tag => {
      const span = document.createElement("span");
      span.className = `chip ${type}`;
      span.innerHTML = `${escapeHtml(tag)} <button type="button" class="chip-remove" onclick="removeTag(this)">×</button>`;
      container.insertBefore(span, input);
    });
  }

  // Input Listeners
  kwInput.addEventListener("input", updateUrls);
  locInput.addEventListener("input", updateUrls);
  expSelect.addEventListener("change", updateUrls);
  jtSelect.addEventListener("change", updateUrls);

  // Segment Buttons (Worktype, Posted)
  document.querySelectorAll(".segmented-control .segment-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      parent.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      updateUrls();
    });
  });

  // Source Toggles (LinkedIn, Indeed)
  document.querySelectorAll(".platform-pill").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("active");
      updateUrls();
    });
  });

  // Copy Active URLs
  const btnCopyAllUrls = document.getElementById("btn-copy-all-urls");
  if (btnCopyAllUrls) {
    btnCopyAllUrls.addEventListener("click", (e) => {
      const urls = [];
      const checkAndAdd = (source, title, el) => {
        const pill = document.querySelector(`.platform-pill[data-source="${source}"]`);
        if (pill && pill.classList.contains("active") && el && el.textContent) {
          urls.push(`${title}: ${el.textContent}`);
        }
      };

      checkAndAdd("linkedin", "LinkedIn", urlLinkedIn);
      checkAndAdd("indeed", "Indeed", urlIndeed);
      checkAndAdd("glassdoor", "Glassdoor", urlGlassdoor);
      checkAndAdd("google", "Google Jobs", urlGoogle);
      checkAndAdd("ziprecruiter", "ZipRecruiter", urlZiprecruiter);

      navigator.clipboard.writeText(urls.join("\n\n"));
      const orig = e.target.textContent;
      e.target.textContent = "Copied Active!";
      setTimeout(() => { e.target.textContent = orig; }, 1500);
    });
  }

  // Clear Results Button in Middle Column
  const btnClearResults = document.getElementById("btn-clear-results");
  if (btnClearResults) {
    btnClearResults.addEventListener("click", () => {
      jobs = [];
      selectedJobId = null;
      renderJobs();
      const emptyState = document.getElementById("detail-empty-state");
      const contentPane = document.getElementById("detail-content");
      if (emptyState) emptyState.style.display = "flex";
      if (contentPane) contentPane.style.display = "none";
      showNotification("Results list cleared.", "success");
    });
  }

  // 3. PRIMARY ACTION: Search & Scrape Jobs Button
  btnRunSearch.addEventListener("click", async () => {
    const isLinkedIn = document.querySelector('.platform-pill[data-source="linkedin"]')?.classList.contains("active");
    const isIndeed = document.querySelector('.platform-pill[data-source="indeed"]')?.classList.contains("active");
    const isGlassdoor = document.querySelector('.platform-pill[data-source="glassdoor"]')?.classList.contains("active");
    const isGoogle = document.querySelector('.platform-pill[data-source="google"]')?.classList.contains("active");
    const isZip = document.querySelector('.platform-pill[data-source="ziprecruiter"]')?.classList.contains("active");

    const selectedPlatforms = [];
    if (isLinkedIn) selectedPlatforms.push("LinkedIn");
    if (isIndeed) selectedPlatforms.push("Indeed");
    if (isGlassdoor) selectedPlatforms.push("Glassdoor");
    if (isGoogle) selectedPlatforms.push("Google Jobs");
    if (isZip) selectedPlatforms.push("ZipRecruiter");

    if (selectedPlatforms.length === 0) {
      showNotification("Please select at least one platform to search.", "error");
      return;
    }

    if (!APIFY_TOKEN) {
      showNotification("Apify API token missing. Please add it to config.js (see config.example.js)", "error");
      return;
    }

    const totalLimit = parseInt(fetchCountInput.value, 10) || 25;
    const query = getConstructedQuery();
    const location = locInput.value.trim() || "Remote";
    const appendMode = document.getElementById("chk-append-results")?.checked;

    btnRunSearch.disabled = true;
    searchBtnText.textContent = "Scraping Jobs...";
    searchBtnIcon.innerHTML = `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="32" stroke-dashoffset="10"/>`;
    searchBtnIcon.classList.add("spinner");
    showNotification(`Scraping ${totalLimit} jobs across ${selectedPlatforms.join(", ")}...`, "loading");

    try {
      const perSourceLimit = Math.max(3, Math.ceil(totalLimit / selectedPlatforms.length));
      let newFetchedJobs = [];

      // Scrape LinkedIn
      if (isLinkedIn) {
        showNotification(`Fetching from LinkedIn via Apify...`, "loading");
        try {
          const liJobs = await scrapeLinkedIn(urlLinkedIn.textContent, query, location, perSourceLimit);
          newFetchedJobs = newFetchedJobs.concat(liJobs);
        } catch (err) {
          console.warn("LinkedIn scrape warning:", err);
        }
      }

      // Scrape Indeed
      if (isIndeed) {
        showNotification(`Fetching from Indeed via Apify...`, "loading");
        try {
          const inJobs = await scrapeIndeed(query, location, perSourceLimit);
          newFetchedJobs = newFetchedJobs.concat(inJobs);
        } catch (err) {
          console.warn("Indeed scrape warning:", err);
        }
      }

      // Scrape Glassdoor
      if (isGlassdoor) {
        showNotification(`Fetching from Glassdoor via Apify...`, "loading");
        try {
          const gdJobs = await scrapeGlassdoor(query, location, perSourceLimit);
          newFetchedJobs = newFetchedJobs.concat(gdJobs);
        } catch (err) {
          console.warn("Glassdoor scrape warning:", err);
        }
      }

      // Scrape Google Jobs
      if (isGoogle) {
        showNotification(`Fetching from Google Jobs via Apify...`, "loading");
        try {
          const gjJobs = await scrapeGoogleJobs(query, location, perSourceLimit);
          newFetchedJobs = newFetchedJobs.concat(gjJobs);
        } catch (err) {
          console.warn("Google Jobs scrape warning:", err);
        }
      }

      // Scrape ZipRecruiter
      if (isZip) {
        showNotification(`Fetching from ZipRecruiter via Apify...`, "loading");
        try {
          const zrJobs = await scrapeZipRecruiter(query, location, perSourceLimit);
          newFetchedJobs = newFetchedJobs.concat(zrJobs);
        } catch (err) {
          console.warn("ZipRecruiter scrape warning:", err);
        }
      }

      if (newFetchedJobs.length > 0) {
        if (appendMode) {
          const existingIds = new Set(jobs.map(j => String(j.id)));
          const uniqueNew = newFetchedJobs.filter(j => !existingIds.has(String(j.id)));
          jobs = [...uniqueNew, ...jobs];
        } else {
          // Fresh results replacement by default (no unwanted merging)
          jobs = newFetchedJobs;
        }

        renderJobs();
        showNotification(`Successfully retrieved ${newFetchedJobs.length} positions!`, "success");

        if (jobs.length > 0) {
          selectJob(jobs[0].id);
        }
      } else {
        showNotification("No jobs returned. Try broader keywords or adjust filters.", "error");
      }
    } catch (error) {
      console.error("Scraping error:", error);
      showNotification(`Scraping failed: ${error.message || "Network error"}`, "error");
    } finally {
      btnRunSearch.disabled = false;
      searchBtnText.textContent = "Search & Scrape Jobs";
      searchBtnIcon.innerHTML = `<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>`;
      searchBtnIcon.classList.remove("spinner");
    }
  });

  // Apify Scraper API Helpers
  async function scrapeLinkedIn(searchUrl, query, location, limit) {
    const actorId = "curious_coder~linkedin-jobs-scraper";
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=240`;

    const payload = {
      urls: [searchUrl],
      limitPerSource: limit,
      maxItems: limit,
      count: limit
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify LinkedIn returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => ({
      id: String(j.id || `li-${Date.now()}-${i}`),
      source: "LinkedIn",
      title: j.title || "Untitled Role",
      company: j.companyName || "Company",
      location: j.location || location,
      date: j.postedAt || "Recent",
      url: j.link || j.jobUrl || j.applyUrl || j.url || "#",
      salary: typeof j.salary === "string" ? j.salary : null,
      description: j.descriptionText || j.description || "",
      tags: [
        j.location && j.location.toLowerCase().includes("remote") ? "Remote" : null,
        j.employmentType,
        j.seniorityLevel
      ].filter(Boolean)
    }));
  }

  async function scrapeIndeed(query, location, limit) {
    const actorId = "curious_coder~indeed-scraper";
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=240`;

    const payload = {
      country: "us",
      query: query,
      location: location,
      count: limit
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify Indeed returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => {
      const cName = j.companyDetails && j.companyDetails.name ? j.companyDetails.name : (j.company || "Company");
      let salaryStr = null;
      if (j.salary && j.salary.min) {
        salaryStr = j.salary.max ? `$${j.salary.min.toLocaleString()} - $${j.salary.max.toLocaleString()}` : `$${j.salary.min.toLocaleString()}`;
      } else if (typeof j.salary === "string") {
        salaryStr = j.salary;
      }

      return {
        id: String(j.id || `in-${Date.now()}-${i}`),
        source: "Indeed",
        title: j.title || "Untitled Role",
        company: cName,
        location: j.formattedLocation || j.location || location,
        date: j.pubDate || "Recent",
        url: j.originalApplyUrl || (j.viewJobLink ? `https://www.indeed.com${j.viewJobLink}` : "#"),
        salary: salaryStr,
        description: j.jobDescription || j.descriptionText || "",
        tags: [
          (j.formattedLocation || location).toLowerCase().includes("remote") ? "Remote" : null,
          salaryStr
        ].filter(Boolean)
      };
    });
  }

  async function scrapeGlassdoor(query, location, limit) {
    const actorId = "curious_coder~glassdoor-jobs-scraper";
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=240`;

    const payload = {
      keyword: query,
      location: location,
      maxItems: limit,
      proxyCountry: "us"
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify Glassdoor returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => ({
      id: String(j.id || `gd-${Date.now()}-${i}`),
      source: "Glassdoor",
      title: j.title || j.jobTitle || "Untitled Role",
      company: j.companyName || j.employerName || (j.company && j.company.name) || "Company",
      location: j.location || location,
      date: j.postedAt || j.postedDate || "Recent",
      url: j.link || j.jobUrl || j.url || `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(query)}`,
      salary: typeof j.salary === "string" ? j.salary : (j.salary ? j.salary.text : null),
      description: j.description || j.jobDescription || j.descriptionText || "",
      tags: [
        (j.location || location).toLowerCase().includes("remote") ? "Remote" : null,
        j.employmentType
      ].filter(Boolean)
    }));
  }

  async function scrapeGoogleJobs(query, location, limit) {
    const actorId = "johnvc~Google-Jobs-Scraper";
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=240`;

    const payload = {
      query: query,
      location: location,
      country: "us",
      language: "en",
      num_results: limit,
      max_pagination: 1
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify Google Jobs returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => {
      let applyLink = j.job_link || j.link || j.url || j.share_link;
      if (!applyLink && Array.isArray(j.apply_options) && j.apply_options[0]) {
        applyLink = j.apply_options[0].link;
      }

      let dateStr = "Recent";
      if (j.detected_extensions && j.detected_extensions.posted_at) {
        dateStr = j.detected_extensions.posted_at;
      } else if (j.posted_at) {
        dateStr = j.posted_at;
      }

      return {
        id: String(j.id || `gj-${Date.now()}-${i}`),
        source: "Google Jobs",
        title: j.title || j.job_title || "Untitled Role",
        company: j.company_name || j.company || "Company",
        location: j.location || location,
        date: dateStr,
        url: applyLink || `https://www.google.com/search?q=${encodeURIComponent(query + ' jobs ' + location)}&ibp=htl;jobs`,
        salary: (j.detected_extensions && j.detected_extensions.salary) || j.salary || null,
        description: j.description || "",
        tags: [
          (j.location && j.location.toLowerCase().includes("remote")) ? "Remote" : null,
          j.via
        ].filter(Boolean)
      };
    });
  }

  async function scrapeZipRecruiter(query, location, limit) {
    const actorId = "memo23~apify-ziprecruiter-scraper";
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}&timeout=240`;

    const payload = {
      searchJobKeyword: query,
      searchLocation: location,
      maxItems: limit
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify ZipRecruiter returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => ({
      id: String(j.id || `zr-${Date.now()}-${i}`),
      source: "ZipRecruiter",
      title: j.title || j.jobTitle || "Untitled Role",
      company: j.hiringCompany || j.company || "Company",
      location: j.location || location,
      date: j.postedDate || "Recent",
      url: j.jobUrl || j.url || j.link || `https://www.ziprecruiter.com/jobs-search?search=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`,
      salary: j.salary || null,
      description: j.jobDescription || j.jobSnippet || j.description || "",
      tags: [
        (j.location || location).toLowerCase().includes("remote") ? "Remote" : null,
        j.employmentType
      ].filter(Boolean)
    }));
  }

  function showNotification(msg, type) {
    notificationBanner.className = `notification-banner ${type}`;
    notificationText.textContent = msg;
    if (type === "loading") {
      notificationSpinner.style.display = "block";
    } else {
      notificationSpinner.style.display = "none";
      if (type === "success") {
        setTimeout(() => {
          notificationBanner.style.display = "none";
        }, 5000);
      }
    }
  }

  // Open Searches in Browser Tabs
  document.getElementById("btn-open-searches").addEventListener("click", () => {
    const openIfActive = (source, urlEl) => {
      const pill = document.querySelector(`.platform-pill[data-source="${source}"]`);
      if (pill && pill.classList.contains("active") && urlEl && urlEl.textContent) {
        window.open(urlEl.textContent, "_blank");
      }
    };

    openIfActive("linkedin", urlLinkedIn);
    openIfActive("indeed", urlIndeed);
    openIfActive("glassdoor", urlGlassdoor);
    openIfActive("google", urlGoogle);
    openIfActive("ziprecruiter", urlZiprecruiter);
  });
  // Reset Form
  document.getElementById("btn-reset-form").addEventListener("click", () => {
    clearForm();
    updateUrls();
  });

  // 4. Render Job List (Left Side)
  function renderJobs() {
    const filterTerm = (rfInput.value || "").toLowerCase().trim();
    const sortVal = rsSelect.value;

    let filtered = jobs.filter(j => {
      if (!filterTerm) return true;
      const text = `${j.title} ${j.company} ${j.location} ${j.description} ${(j.tags || []).join(" ")}`.toLowerCase();
      return text.includes(filterTerm);
    });

    if (sortVal === "company") {
      filtered.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
    } else if (sortVal === "source") {
      filtered.sort((a, b) => (a.source || "").localeCompare(b.source || ""));
    }

    resultsCountEl.textContent = `(${filtered.length} positions)`;

    if (filtered.length === 0) {
      jobListEl.innerHTML = `
        <div class="empty-list-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke-width="1.8">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <p style="font-size: 13px;">No jobs loaded yet.</p>
          <p style="font-size: 12px; max-width: 280px;">Adjust your keywords above or use <strong>Describe to AI</strong>, then click <strong>Search &amp; Scrape Jobs</strong>.</p>
          <button type="button" class="btn-ghost" style="margin-top: 6px; font-size: 12px;" onclick="loadStoredResults()">Load previously scraped results (25)</button>
        </div>
      `;
      return;
    }

    jobListEl.innerHTML = filtered.map(job => {
      const meta = getPlatformMeta(job.source);
      const isSelected = String(job.id) === String(selectedJobId);
      const salaryHtml = job.salary ? `<span class="job-salary-tag">${escapeHtml(job.salary)}</span>` : "";

      return `
        <div class="job-item ${isSelected ? "selected" : ""}" data-id="${job.id}" onclick="selectJob('${job.id}')">
          <div class="job-item-top">
            <div class="job-item-title">${escapeHtml(job.title)}</div>
            <span class="badge-source ${meta.key}">
              ${meta.iconSm}
              <span>${escapeHtml(meta.name)}</span>
            </span>
          </div>
          <div class="job-item-company">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</div>
          <div class="job-item-meta">
            ${salaryHtml}
            <span class="job-item-date">${escapeHtml(formatDate(job.date))}</span>
            <a href="${escapeHtml(job.url || "#")}" target="_blank" rel="noopener" class="job-item-ext-link" onclick="event.stopPropagation()" title="Open posting in new tab">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      `;    }).join("");
  }

  // Filter & Sort
  rfInput.addEventListener("input", renderJobs);
  rsSelect.addEventListener("change", renderJobs);

  // Export CSV
  document.getElementById("btn-export-csv").addEventListener("click", () => {
    if (jobs.length === 0) return alert("No jobs to export.");
    const headers = ["Title", "Company", "Location", "Source", "Date", "URL", "Salary"];
    const rows = jobs.map(j => [
      `"${(j.title || "").replace(/"/g, '""')}"`,
      `"${(j.company || "").replace(/"/g, '""')}"`,
      `"${(j.location || "").replace(/"/g, '""')}"`,
      `"${(j.source || "").replace(/"/g, '""')}"`,
      `"${(j.date || "").replace(/"/g, '""')}"`,
      `"${(j.url || "").replace(/"/g, '""')}"`,
      `"${(j.salary || "").replace(/"/g, '""')}"`
    ]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadFile(csv, "jobs_export.csv", "text/csv;charset=utf-8;");
  });

  // Export JSON
  document.getElementById("btn-export-json").addEventListener("click", () => {
    if (jobs.length === 0) return alert("No jobs to export.");
    downloadFile(JSON.stringify(jobs, null, 2), "jobs_export.json", "application/json");
  });

  function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Export to window for global access
  window.renderJobs = renderJobs;
  window.selectJob = selectJob;
  window.updateUrls = updateUrls;

  // Initial setup
  updateUrls();
  renderJobs();
});

// 5. COLLAPSIBLE URLs SECTION
function toggleUrlsSection() {
  const card = document.getElementById("urls-card");
  if (card) {
    card.classList.toggle("collapsed");
  }
}

// 6. SELECT JOB: Shows Full Details on Right Pane
function selectJob(jobId) {
  selectedJobId = jobId;
  const job = jobs.find(j => String(j.id) === String(jobId));
  if (!job) return;

  document.querySelectorAll(".job-item").forEach(item => {
    item.classList.toggle("selected", item.dataset.id === String(jobId));
  });

  const emptyState = document.getElementById("detail-empty-state");
  const contentPane = document.getElementById("detail-content");
  if (emptyState) emptyState.style.display = "none";
  if (contentPane) contentPane.style.display = "flex";

  // Fill Header
  document.getElementById("detail-job-title").textContent = job.title || "Untitled Role";
  document.getElementById("detail-company").textContent = job.company || "Unlisted Company";
  document.getElementById("detail-location").textContent = job.location || "Remote";

  const meta = getPlatformMeta(job.source);
  const sourceBadge = document.getElementById("detail-source-badge");
  if (sourceBadge) {
    sourceBadge.className = `badge-source ${meta.key}`;
    sourceBadge.innerHTML = `${meta.iconSm} <span>${escapeHtml(meta.name)}</span>`;
  }
  // Fill Stats Bar
  const salaryWrap = document.getElementById("stat-salary-wrap");
  const salaryEl = document.getElementById("detail-salary");
  if (job.salary) {
    salaryWrap.style.display = "flex";
    salaryEl.textContent = job.salary;
  } else {
    salaryWrap.style.display = "none";
  }

  const worktypeEl = document.getElementById("detail-worktype");
  const isRemote = (job.location || "").toLowerCase().includes("remote") || (job.description || "").toLowerCase().includes("remote");
  worktypeEl.textContent = isRemote ? "Remote" : "On-site / Hybrid";

  document.getElementById("detail-date").textContent = formatDate(job.date);

  // Action Buttons
  const applyBtn = document.getElementById("detail-apply-btn");
  if (applyBtn) {
    applyBtn.href = job.url || "#";
    applyBtn.className = `btn-apply-primary ${meta.applyClass}`;
    applyBtn.innerHTML = `
      ${meta.iconMd}
      <span>View on ${escapeHtml(meta.name)}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    `;
  }
  const copyBtn = document.getElementById("detail-copy-btn");
  copyBtn.onclick = function() {
    navigator.clipboard.writeText(job.url || window.location.href);
    const orig = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => { copyBtn.textContent = orig; }, 1500);
  };

  // Full Job Description - Render Markdown & Lists
  const descEl = document.getElementById("detail-description");
  descEl.innerHTML = formatJobDescription(job.description);
}

// Format timestamps or date strings into readable format
function formatDate(val) {
  if (!val) return "Recent";
  if (typeof val === "number" || (/^\d{10,13}$/.test(String(val).trim()))) {
    const ms = Number(val);
    const d = new Date(ms);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  }
  const str = String(val).trim();
  if (str.includes("-") || str.includes("/")) {
    const d = new Date(str);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  }
  return str;
}

// Markdown & Job Description Formatter
function decodeHtmlEntities(str) {
  if (!str) return "";
  return String(str)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function isHeaderLine(trimmed, nextTrimmed) {
  if (!trimmed || trimmed.length > 75) return false;
  if (/^([-*+•–—\d]|\u2022|\u2013|\u2014)/.test(trimmed)) return false;
  if (trimmed.endsWith(".") && !trimmed.endsWith("...")) return false;
  if (trimmed.endsWith(",")) return false;

  if (/^(#{1,6})\s+/.test(trimmed)) return true;
  if (/^\*\*.*?\*\*:?$/.test(trimmed)) return true;
  if (trimmed.endsWith(":")) return true;
  if (/^[A-Z0-9\s,&/–—\-:]+$/.test(trimmed) && trimmed.replace(/[^A-Z]/g, "").length >= 3) return true;

  const keywords = /\b(accountabilities|responsibilities|qualifications|requirements|skills|attributes|competencies|about\s+us|about\s+the|what\s+you|who\s+you|what\s+we|overview|summary|benefits|perks|duties|experience|education|stack|technologies|who\s+we\s+are|what\s+success\s+looks\s+like|key\s+indicators)\b/i;
  if (keywords.test(trimmed)) return true;

  if (nextTrimmed !== undefined) {
    if (nextTrimmed.startsWith("-") || nextTrimmed.startsWith("*") || nextTrimmed.startsWith("•") || nextTrimmed === "") {
      const words = trimmed.split(/\s+/);
      const capWords = words.filter(w => /^[A-Z]/.test(w));
      if (capWords.length >= words.length * 0.6 && words.length <= 6) return true;
    }
  }

  return false;
}

function isListHeading(trimmed) {
  return /\b(responsibilities|qualifications|requirements|skills|attributes|competencies|duties|benefits|perks|indicators|what\s+you\s+will\s+do|what\s+you\s+bring)\b/i.test(trimmed);
}

function formatJobDescription(raw) {
  if (!raw) return '<p>No job description text provided.</p>';

  let text = String(raw).trim();

  // If text has HTML tags, check if it has structured tags like <p>, <ul>, <li>, <h3>
  const hasFullHtml = /<\s*(p|ul|ol|li|h[1-6]|div)\b[^>]*>/i.test(text);
  if (hasFullHtml) {
    return decodeHtmlEntities(text);
  }

  // Normalize <br> or <br/> or <p> tags into newlines for clean parsing
  text = text.replace(/<\s*br\s*\/?>/gi, "\n");
  text = text.replace(/<\/\s*p\s*>/gi, "\n\n");
  text = text.replace(/<\s*p\b[^>]*>/gi, "");

  text = decodeHtmlEntities(text);

  const lines = text.split(/\r?\n/);
  const output = [];
  let inList = false;
  let listType = "ul";
  let currentParagraph = [];
  let underListSection = false;

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const pText = currentParagraph.map(formatInline).join("<br>");
      output.push(`<p>${pText}</p>`);
      currentParagraph = [];
    }
  }

  function flushList() {
    if (inList) {
      output.push(`</${listType}>`);
      inList = false;
    }
  }

  function formatInline(str) {
    let s = escapeHtml(str);
    s = s.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__(.*?)__/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^\*])\*(?!\*)(.*?)\*(?!\*)/g, "$1<em>$2</em>");
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return s;
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();
    const nextTrimmed = (i + 1 < lines.length) ? lines[i + 1].trim() : "";

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    // Markdown Headers: # Header
    const headerMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      flushParagraph();
      flushList();
      underListSection = isListHeading(headerMatch[2]);
      const level = Math.min(6, headerMatch[1].length + 1);
      output.push(`<h${level} class="jd-section-title">${formatInline(headerMatch[2])}</h${level}>`);
      continue;
    }

    // Bullet List Items: - item, * item, + item, • item, – item, — item
    const bulletMatch = trimmed.match(/^([-*+•–—]|\u2022|\u2013|\u2014)\s+(.*)$/);
    if (bulletMatch) {
      flushParagraph();
      if (!inList || listType !== "ul") {
        flushList();
        output.push('<ul class="jd-bullet-list">');
        inList = true;
        listType = "ul";
      }
      output.push(`<li>${formatInline(bulletMatch[2])}</li>`);
      continue;
    }

    // Numbered List Items: 1. item, 2. item
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (numMatch) {
      flushParagraph();
      if (!inList || listType !== "ol") {
        flushList();
        output.push('<ol class="jd-numbered-list">');
        inList = true;
        listType = "ol";
      }
      output.push(`<li>${formatInline(numMatch[2])}</li>`);
      continue;
    }

    // Section Heading Check
    if (isHeaderLine(trimmed, nextTrimmed)) {
      flushParagraph();
      flushList();
      underListSection = isListHeading(trimmed);
      const cleanHeader = trimmed.replace(/^\*\*|\*\*$/g, "").trim();
      output.push(`<h4 class="jd-section-title">${formatInline(cleanHeader)}</h4>`);
      continue;
    }

    // If under a list section (like "Key Responsibilities", "Minimum Qualifications"), treat standalone lines as list items
    if (underListSection && trimmed.length < 250 && !trimmed.endsWith(":")) {
      flushParagraph();
      if (!inList || listType !== "ul") {
        flushList();
        output.push('<ul class="jd-bullet-list">');
        inList = true;
        listType = "ul";
      }
      output.push(`<li>${formatInline(trimmed)}</li>`);
      continue;
    }

    // Indented continuation of previous list item
    if (inList && /^\s{2,}/.test(rawLine)) {
      const lastIndex = output.length - 1;
      if (output[lastIndex].endsWith("</li>")) {
        output[lastIndex] = output[lastIndex].slice(0, -5) + " " + formatInline(trimmed) + "</li>";
        continue;
      }
    }

    if (inList) {
      flushList();
    }

    currentParagraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return output.join("\n");
}

// Single URL actions
function copyUrl(elementId, btn) {
  const el = document.getElementById(elementId);
  if (!el) return;
  navigator.clipboard.writeText(el.textContent);
  const orig = btn.textContent;
  btn.textContent = "Copied!";
  setTimeout(() => { btn.textContent = orig; }, 1500);
}

function openSingleUrl(elementId) {
  const el = document.getElementById(elementId);
  if (el && el.textContent) {
    window.open(el.textContent, "_blank");
  }
}

// Preset Fetch Count Buttons (10, 25, 50, 100)
function setFetchCount(val) {
  const input = document.getElementById("fetch-count");
  if (input) input.value = val;
}

// Load previously stored jobs on demand
function loadStoredResults() {
  if (window.SCRAPED_JOBS && window.SCRAPED_JOBS.length > 0) {
    jobs = window.SCRAPED_JOBS.map((j, i) => ({
      id: String(j.id || `stored-${i}`),
      source: j.source || "LinkedIn",
      title: j.title || "Untitled Role",
      company: j.company || "Company",
      location: j.location || "Remote",
      date: j.date || "Recent",
      url: j.url || j.link || j.jobUrl || j.applyUrl || "#",
      salary: j.salary || null,
      description: j.description || j.descriptionText || "",
      tags: j.tags || []
    }));
    window.renderJobs();
    if (jobs.length > 0) {
      selectJob(jobs[0].id);
    }
  }
}

// Global Tag and Preset Handlers
function focusTagInput(container) {
  const input = container.querySelector(".inline-tag-input");
  if (input) input.focus();
}

function handleTagKey(e, type) {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    const val = e.target.value.replace(/,/g, "").trim();
    if (!val) return;

    const span = document.createElement("span");
    span.className = `chip ${type}`;
    span.innerHTML = `${escapeHtml(val)} <button type="button" class="chip-remove" onclick="removeTag(this)">×</button>`;
    
    e.target.parentElement.insertBefore(span, e.target);
    e.target.value = "";
    if (window.updateUrls) window.updateUrls();
  }
}

function removeTag(btn) {
  const chip = btn.closest(".chip");
  if (chip) chip.remove();
  if (window.updateUrls) window.updateUrls();
}

function loadSearchPreset(preset, btnEl) {
  const kw = document.getElementById("kw");
  const loc = document.getElementById("loc");
  const exp = document.getElementById("exp");

  document.querySelectorAll(".preset-pill").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  if (preset === "junior-dotnet-ai") {
    kw.value = "Junior .NET AI";
    loc.value = "Remote";
    exp.value = "entry";
  } else if (preset === "entry-csharp") {
    kw.value = "Entry Level C# Azure";
    loc.value = "Remote";
    exp.value = "entry";
  } else if (preset === "ai-engineer-remote") {
    kw.value = "AI Engineer";
    loc.value = "Worldwide";
    exp.value = "any";
  }
  if (window.updateUrls) window.updateUrls();
}

function clearForm() {
  document.getElementById("kw").value = "";
  document.getElementById("loc").value = "";
  document.querySelectorAll(".chip").forEach(c => c.remove());
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
