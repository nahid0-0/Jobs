// RoleRadar - Multi-Platform Job Search & Intelligence Engine
window.ENV = window.ENV || {};
const STORAGE_KEY_APIFY = "roleRadar_apify_token";
const STORAGE_KEY_GEMINI = "roleRadar_gemini_api_key";

function getApifyToken() {
  const local = localStorage.getItem(STORAGE_KEY_APIFY);
  if (local && local.trim()) return local.trim();
  return (window.ENV && window.ENV.APIFY_TOKEN) ? window.ENV.APIFY_TOKEN.trim() : "";
}

function getGeminiApiKey() {
  const local = localStorage.getItem(STORAGE_KEY_GEMINI);
  if (local && local.trim()) return local.trim();
  return (window.ENV && window.ENV.GEMINI_API_KEY) ? window.ENV.GEMINI_API_KEY.trim() : "";
}

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

  function getPlatformQuery(platform) {
    const kw = kwInput.value.trim();
    const mustTags = getTags("chips-must");
    const anyTags = getTags("chips-any");
    const excludeTags = getTags("chips-exclude");

    if (platform === "linkedin") {
      return getConstructedQuery();
    }

    if (platform === "indeed" || platform === "google") {
      let q = kw;
      if (mustTags.length > 0) q += " " + mustTags.join(" ");
      if (anyTags.length > 0) q += " (" + anyTags.join(" OR ") + ")";
      if (excludeTags.length > 0) q += " " + excludeTags.map(t => `-${t}`).join(" ");
      return q.trim();
    }

    // Glassdoor and ZipRecruiter - clean terms without boolean NOT operators
    let q = kw;
    if (mustTags.length > 0) q += " " + mustTags.join(" ");
    if (anyTags.length > 0) q += " " + anyTags[0];
    return q.trim();
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
    const geminiKey = getGeminiApiKey();
    if (!geminiKey) {
      aiStatusMsg.style.display = "block";
      aiStatusMsg.style.color = "#b91c1c";
      aiStatusMsg.textContent = "Google Gemini API key missing. Click 'API Keys' in the top bar to paste your key.";
      if (typeof openSettingsModal === "function") openSettingsModal();
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
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(geminiKey)}`;
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

    const apifyToken = getApifyToken();
    if (!apifyToken) {
      showNotification("Apify API token missing. Click 'API Keys' in the top bar to paste your token.", "error");
      if (typeof openSettingsModal === "function") openSettingsModal();
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
      const perSourceLimit = Math.max(5, Math.ceil(totalLimit / selectedPlatforms.length));
      showNotification(`Scraping across ${selectedPlatforms.join(", ")} in parallel...`, "loading");

      const scrapeTasks = [];

      // 1. LinkedIn
      if (isLinkedIn) {
        scrapeTasks.push(
          scrapeLinkedIn(urlLinkedIn.textContent, getPlatformQuery("linkedin"), location, perSourceLimit)
            .then(res => ({ platform: "LinkedIn", jobs: res }))
            .catch(err => {
              console.warn("LinkedIn scrape error:", err);
              return { platform: "LinkedIn", jobs: [] };
            })
        );
      }

      // 2. Indeed
      if (isIndeed) {
        scrapeTasks.push(
          scrapeIndeed(getPlatformQuery("indeed"), location, perSourceLimit)
            .then(res => ({ platform: "Indeed", jobs: res }))
            .catch(err => {
              console.warn("Indeed scrape error:", err);
              return { platform: "Indeed", jobs: [] };
            })
        );
      }

      // 3. Glassdoor
      if (isGlassdoor) {
        scrapeTasks.push(
          scrapeGlassdoor(getPlatformQuery("glassdoor"), location, perSourceLimit)
            .then(res => ({ platform: "Glassdoor", jobs: res }))
            .catch(err => {
              console.warn("Glassdoor scrape error:", err);
              return { platform: "Glassdoor", jobs: [] };
            })
        );
      }

      // 4. Google Jobs
      if (isGoogle) {
        scrapeTasks.push(
          scrapeGoogleJobs(getPlatformQuery("google"), location, perSourceLimit)
            .then(res => ({ platform: "Google Jobs", jobs: res }))
            .catch(err => {
              console.warn("Google Jobs scrape error:", err);
              return { platform: "Google Jobs", jobs: [] };
            })
        );
      }

      // 5. ZipRecruiter
      if (isZip) {
        scrapeTasks.push(
          scrapeZipRecruiter(getPlatformQuery("ziprecruiter"), location, perSourceLimit)
            .then(res => ({ platform: "ZipRecruiter", jobs: res }))
            .catch(err => {
              console.warn("ZipRecruiter scrape error:", err);
              return { platform: "ZipRecruiter", jobs: [] };
            })
        );
      }

      const results = await Promise.all(scrapeTasks);
      let newFetchedJobs = [];
      results.forEach(r => {
        if (r && Array.isArray(r.jobs)) {
          newFetchedJobs = newFetchedJobs.concat(r.jobs);
        }
      });

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
    const token = getApifyToken();
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&timeout=240`;

    const payload = {
      urls: [searchUrl],
      maxJobs: limit,
      maxItems: limit,
      count: limit,
      limitPerSource: limit
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify LinkedIn returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => {
      const desc = j.description || j.descriptionHtml || j.descriptionText || j.jobDescription || j.snippet || j.companyDescription || "";
      const dateVal = j.postedDate || j.postedAgo || j.postedAt || "Recent";
      const jobUrl = j.link || j.jobUrl || j.applyUrl || j.url || searchUrl;
      return {
        id: String(j.id || `li-${Date.now()}-${i}`),
        source: "LinkedIn",
        title: j.title || "Untitled Role",
        company: j.companyName || j.company || "Company",
        location: j.location || location,
        date: dateVal,
        url: jobUrl,
        salary: typeof j.salary === "string" ? j.salary : (j.salary ? (j.salary.text || null) : null),
        description: desc,
        tags: [
          (j.location && j.location.toLowerCase().includes("remote")) ? "Remote" : null,
          j.employmentType,
          j.seniorityLevel
        ].filter(Boolean)
      };
    });
  }

  async function scrapeIndeed(query, location, limit) {
    const actorId = "curious_coder~indeed-scraper";
    const token = getApifyToken();
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&timeout=240`;

    const payload = {
      country: "us",
      query: query,
      location: location,
      maxItems: limit,
      count: limit,
      parseCompanyDetails: true
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify Indeed returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => {
      const cName = j.company_name || (j.companyDetails && j.companyDetails.name) || j.company || "Company";
      let salaryStr = null;
      if (j.salary && j.salary.min) {
        salaryStr = j.salary.max ? `$${j.salary.min.toLocaleString()} - $${j.salary.max.toLocaleString()}` : `$${j.salary.min.toLocaleString()}`;
      } else if (typeof j.salary === "string") {
        salaryStr = j.salary;
      }
      const desc = j.description || j.description_text || j.jobDescription || j.jobDescriptionHTML || j.snippet || "";
      const jobUrl = j.url || j.external_apply_link || (j.viewJobLink ? `https://www.indeed.com${j.viewJobLink}` : (j.originalApplyUrl || "#"));
      const dateVal = j.posted_date || j.relative_time || j.pubDate || "Recent";

      return {
        id: String(j.job_id || j.id || `in-${Date.now()}-${i}`),
        source: "Indeed",
        title: j.title || "Untitled Role",
        company: cName,
        location: j.location || j.formattedLocation || location,
        date: dateVal,
        url: jobUrl,
        salary: salaryStr,
        description: desc,
        tags: [
          ((j.location || j.formattedLocation || location).toLowerCase().includes("remote") || j.is_remote) ? "Remote" : null,
          salaryStr
        ].filter(Boolean)
      };
    });
  }

  async function scrapeGlassdoor(query, location, limit) {
    const actorId = "curious_coder~glassdoor-jobs-scraper";
    const token = getApifyToken();
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&timeout=240`;

    const payload = {
      searchQueries: [query],
      keywords: [query],
      location: location,
      maxItems: limit,
      includeDetails: true
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify Glassdoor returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => {
      const desc = j.description || j.descriptionHtml || j.jobDescription || j.descriptionText || j.jobSummary || "";
      return {
        id: String(j.id || `gd-${Date.now()}-${i}`),
        source: "Glassdoor",
        title: j.title || j.jobTitle || "Untitled Role",
        company: j.companyName || j.employerName || (j.company && j.company.name) || "Company",
        location: j.location || location,
        date: j.postedDate || j.postedAt || "Recent",
        url: j.url || j.link || j.jobUrl || `https://www.glassdoor.com/Job/jobs.htm?sc.keyword=${encodeURIComponent(query)}`,
        salary: typeof j.salary === "string" ? j.salary : (j.salary ? (j.salary.text || null) : null),
        description: desc,
        tags: [
          ((j.location || location).toLowerCase().includes("remote") || j.isRemote) ? "Remote" : null,
          j.employmentType
        ].filter(Boolean)
      };
    });
  }

  async function scrapeGoogleJobs(query, location, limit) {
    const actorId = "johnvc~Google-Jobs-Scraper";
    const token = getApifyToken();
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&timeout=240`;

    // Actor schema requires num_results to be >= 10
    const count = Math.max(10, limit);
    const payload = {
      query: query,
      location: location,
      country: "us",
      language: "en",
      num_results: count,
      maxItems: count,
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

      const desc = j.description || j.job_description || j.snippet || (j.job_highlights ? JSON.stringify(j.job_highlights) : "") || "";

      return {
        id: String(j.id || `gj-${Date.now()}-${i}`),
        source: "Google Jobs",
        title: j.title || j.job_title || "Untitled Role",
        company: j.company_name || j.company || "Company",
        location: j.location || location,
        date: dateStr,
        url: applyLink || `https://www.google.com/search?q=${encodeURIComponent(query + ' jobs ' + location)}&ibp=htl;jobs`,
        salary: (j.detected_extensions && j.detected_extensions.salary) || j.salary || null,
        description: desc,
        tags: [
          (j.location && j.location.toLowerCase().includes("remote")) ? "Remote" : null,
          j.via
        ].filter(Boolean)
      };
    });
  }

  async function scrapeZipRecruiter(query, location, limit) {
    const actorId = "memo23~apify-ziprecruiter-scraper";
    const token = getApifyToken();
    const endpoint = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&timeout=240`;

    const payload = {
      searchJobKeyword: query,
      searchLocation: location,
      maxItems: limit,
      scrapeJobDetails: true
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Apify ZipRecruiter returned ${res.status}`);
    const data = await res.json();

    return (data || []).map((j, i) => {
      const desc = j.job_description || j.description || j.job_snippet || j.snippet || j.body || "";
      return {
        id: String(j.id || `zr-${Date.now()}-${i}`),
        source: "ZipRecruiter",
        title: j.title || j.job_title || "Untitled Role",
        company: j.company || j.company_name || j.hiring_company_name || "Company",
        location: j.location || location,
        date: j.posted_time || j.posted_at || "Recent",
        url: j.url || j.job_url || "#",
        salary: j.salary || j.salary_source || null,
        description: desc,
        tags: [
          (j.location || location).toLowerCase().includes("remote") ? "Remote" : null,
          j.employment_type
        ].filter(Boolean)
      };
    });
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

    // Check saved IDs for persistent save button states
    let savedIds = new Set();
    try {
      const stored = localStorage.getItem("roleRadar_saved_jobs");
      if (stored) {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) savedIds = new Set(arr.map(j => String(j.id)));
      }
    } catch (e) {}

    jobListEl.innerHTML = filtered.map(job => {
      const meta = getPlatformMeta(job.source);
      const isSelected = String(job.id) === String(selectedJobId);
      const salaryHtml = job.salary ? `<span class="job-salary-tag">${escapeHtml(job.salary)}</span>` : "";
      const isSaved = savedIds.has(String(job.id));

      const actionButtonHtml = `
        <button type="button" class="btn-job-action btn-job-save ${isSaved ? "saved" : ""}" onclick="handleJobSave(event, '${job.id}')" title="${isSaved ? "Saved to All Jobs" : "Save job to All Jobs"}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="${isSaved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>${isSaved ? "Saved" : "Save"}</span>
        </button>
      `;

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
          ${job.salary ? `<div class="job-item-salary">${salaryHtml}</div>` : ""}
          <div class="job-item-meta">
            <span class="job-item-date">${escapeHtml(formatDate(job.date))}</span>
            <a href="${escapeHtml(job.url || "#")}" target="_blank" rel="noopener" class="job-item-ext-link" onclick="event.stopPropagation()" title="Open posting in new tab">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            ${actionButtonHtml}
          </div>
        </div>
      `;
    }).join("");
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

  // Settings Modal Elements & Handlers
  const btnOpenSettings = document.getElementById("btn-open-apikeys") || document.getElementById("btn-open-settings");
  const settingsModal = document.getElementById("settings-modal");
  const btnCloseSettings = document.getElementById("btn-close-settings");
  const btnCancelSettings = document.getElementById("btn-cancel-settings");
  const btnSaveSettings = document.getElementById("btn-save-settings");
  const btnClearSettings = document.getElementById("btn-clear-settings");
  const inputApifyToken = document.getElementById("setting-apify-token");
  const inputGeminiKey = document.getElementById("setting-gemini-key");
  const statusApify = document.getElementById("status-apify");
  const statusGemini = document.getElementById("status-gemini");
  const settingsAlert = document.getElementById("settings-alert");

  function updateSettingsStatus() {
    const apifyToken = getApifyToken();
    const geminiKey = getGeminiApiKey();

    if (statusApify) {
      if (apifyToken) {
        statusApify.textContent = "CONFIGURED";
        statusApify.className = "key-status-badge configured";
      } else {
        statusApify.textContent = "NOT SET";
        statusApify.className = "key-status-badge unset";
      }
    }

    if (statusGemini) {
      if (geminiKey) {
        statusGemini.textContent = "CONFIGURED";
        statusGemini.className = "key-status-badge configured";
      } else {
        statusGemini.textContent = "NOT SET";
        statusGemini.className = "key-status-badge unset";
      }
    }

    const sidebarStatus = document.getElementById("sidebar-status-text");
    if (sidebarStatus) {
      if (apifyToken && geminiKey) sidebarStatus.textContent = "Apify & Gemini Ready";
      else if (apifyToken || geminiKey) sidebarStatus.textContent = "APIs Active · Partial";
      else sidebarStatus.textContent = "Ready · Local Mode";
    }

    const allBadge = document.getElementById("nav-all-count");
    if (allBadge) {
      try {
        const stored = localStorage.getItem("roleRadar_saved_jobs");
        allBadge.textContent = stored ? JSON.parse(stored).length : "0";
      } catch (e) {
        allBadge.textContent = "0";
      }
    }
  }

  function openSettingsModal() {
    if (!settingsModal) return;
    if (inputApifyToken) inputApifyToken.value = getApifyToken();
    if (inputGeminiKey) inputGeminiKey.value = getGeminiApiKey();
    if (settingsAlert) settingsAlert.style.display = "none";
    updateSettingsStatus();
    settingsModal.style.display = "flex";
    if (inputApifyToken && !inputApifyToken.value) {
      inputApifyToken.focus();
    } else if (inputGeminiKey && !inputGeminiKey.value) {
      inputGeminiKey.focus();
    }
  }

  function closeSettingsModal() {
    if (!settingsModal) return;
    settingsModal.style.display = "none";
    if (settingsAlert) settingsAlert.style.display = "none";
  }

  function saveSettings() {
    const apifyVal = inputApifyToken ? inputApifyToken.value.trim() : "";
    const geminiVal = inputGeminiKey ? inputGeminiKey.value.trim() : "";

    if (apifyVal) {
      localStorage.setItem(STORAGE_KEY_APIFY, apifyVal);
    } else {
      localStorage.removeItem(STORAGE_KEY_APIFY);
    }

    if (geminiVal) {
      localStorage.setItem(STORAGE_KEY_GEMINI, geminiVal);
    } else {
      localStorage.removeItem(STORAGE_KEY_GEMINI);
    }

    updateSettingsStatus();

    if (settingsAlert) {
      settingsAlert.className = "window-alert success";
      settingsAlert.textContent = "API credentials saved to browser storage.";
      settingsAlert.style.display = "flex";
    }

    setTimeout(() => {
      closeSettingsModal();
    }, 600);
  }

  function clearSettings() {
    if (confirm("Clear your saved API keys from browser storage?")) {
      localStorage.removeItem(STORAGE_KEY_APIFY);
      localStorage.removeItem(STORAGE_KEY_GEMINI);
      if (inputApifyToken) inputApifyToken.value = "";
      if (inputGeminiKey) inputGeminiKey.value = "";
      updateSettingsStatus();
      if (settingsAlert) {
        settingsAlert.className = "window-alert success";
        settingsAlert.textContent = "Saved credentials cleared.";
        settingsAlert.style.display = "flex";
      }
    }
  }

  // Password visibility toggle buttons
  document.querySelectorAll(".btn-toggle-visibility").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetInput = document.getElementById(targetId);
      if (!targetInput) return;
      if (targetInput.type === "password") {
        targetInput.type = "text";
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        targetInput.type = "password";
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });

  if (btnOpenSettings) btnOpenSettings.addEventListener("click", openSettingsModal);
  if (btnCloseSettings) btnCloseSettings.addEventListener("click", closeSettingsModal);
  if (btnCancelSettings) btnCancelSettings.addEventListener("click", closeSettingsModal);
  if (btnSaveSettings) btnSaveSettings.addEventListener("click", saveSettings);
  if (btnClearSettings) btnClearSettings.addEventListener("click", clearSettings);

  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) closeSettingsModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && settingsModal && settingsModal.style.display !== "none") {
      closeSettingsModal();
    }
  });

  window.openSettingsModal = openSettingsModal;
  window.closeSettingsModal = closeSettingsModal;

  // Initial setup
  updateSettingsStatus();
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

  // Detail Save Button
  const detailSaveBtn = document.getElementById("detail-save-btn");
  if (detailSaveBtn) {
    let saved = false;
    try {
      const stored = localStorage.getItem("roleRadar_saved_jobs");
      if (stored) {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) saved = arr.some(j => String(j.id) === String(job.id));
      }
    } catch (e) {}
    detailSaveBtn.classList.toggle("saved", saved);
    detailSaveBtn.title = saved ? "Saved to All Jobs" : "Save job to All Jobs";
    const span = detailSaveBtn.querySelector("span");
    if (span) span.textContent = saved ? "Saved" : "Save Job";
    const svg = detailSaveBtn.querySelector("svg");
    if (svg) svg.setAttribute("fill", saved ? "currentColor" : "none");
    detailSaveBtn.onclick = function() {
      window.handleJobSave(null, job.id);
    };
  }

  // Full Job Description - Render Markdown & Lists
  const descEl = document.getElementById("detail-description");
  descEl.innerHTML = formatJobDescription(job.description, job);
}

// Persistent Job Save Handler for Search Results
window.handleJobSave = function(event, jobId) {
  if (event) event.stopPropagation();
  const job = jobs.find(j => String(j.id) === String(jobId));
  if (!job) return;

  let savedJobs = [];
  try {
    const stored = localStorage.getItem("roleRadar_saved_jobs");
    if (stored) savedJobs = JSON.parse(stored);
  } catch (e) {
    savedJobs = [];
  }

  const idx = savedJobs.findIndex(j => String(j.id) === String(jobId));
  const isNowSaved = idx < 0;

  if (isNowSaved) {
    savedJobs.unshift(job);
  } else {
    savedJobs.splice(idx, 1);
  }

  try {
    localStorage.setItem("roleRadar_saved_jobs", JSON.stringify(savedJobs));
  } catch (e) {}

  // Update button in list card
  const card = document.querySelector(`.job-item[data-id="${jobId}"]`);
  if (card) {
    const btn = card.querySelector(".btn-job-save");
    if (btn) {
      btn.classList.toggle("saved", isNowSaved);
      btn.title = isNowSaved ? "Saved to All Jobs" : "Save job to All Jobs";
      const span = btn.querySelector("span");
      if (span) span.textContent = isNowSaved ? "Saved" : "Save";
      const svg = btn.querySelector("svg");
      if (svg) svg.setAttribute("fill", isNowSaved ? "currentColor" : "none");
    }
  }

  // Update detail save button if currently selected
  const detailSaveBtn = document.getElementById("detail-save-btn");
  if (detailSaveBtn && String(selectedJobId) === String(jobId)) {
    detailSaveBtn.classList.toggle("saved", isNowSaved);
    detailSaveBtn.title = isNowSaved ? "Saved to All Jobs" : "Save job to All Jobs";
    const span = detailSaveBtn.querySelector("span");
    if (span) span.textContent = isNowSaved ? "Saved" : "Save Job";
    const svg = detailSaveBtn.querySelector("svg");
    if (svg) svg.setAttribute("fill", isNowSaved ? "currentColor" : "none");
  }
};

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

function sanitizeHtml(htmlStr) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr, "text/html");
    const unsafe = doc.querySelectorAll("script, style, iframe, object, embed, form, input, button, applet");
    unsafe.forEach(el => el.remove());
    const all = doc.body.querySelectorAll("*");
    all.forEach(el => {
      for (let i = el.attributes.length - 1; i >= 0; i--) {
        const attr = el.attributes[i];
        if (attr.name.startsWith("on") || (attr.name === "href" && attr.value.trim().toLowerCase().startsWith("javascript:"))) {
          el.removeAttribute(attr.name);
        }
      }
      if (el.tagName.toLowerCase() === "a") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });
    return doc.body.innerHTML;
  } catch (e) {
    return escapeHtml(htmlStr);
  }
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

function formatJobDescription(raw, job) {
  if (!raw || !String(raw).trim()) {
    const jobUrl = (job && job.url && job.url !== "#") ? job.url : null;
    const source = (job && job.source) ? job.source : "the source platform";
    return `
      <div class="empty-desc-card">
        <div class="empty-desc-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span class="empty-desc-title">Description Preview Not In API Response</span>
        </div>
        <p class="empty-desc-text">
          ${escapeHtml(source)} did not return the full description text in this API preview batch.
          You can inspect the full description, qualifications, and apply directly on the official site:
        </p>
        ${jobUrl ? `<a href="${jobUrl}" target="_blank" rel="noopener" class="btn-empty-desc-action">
          Open Full Job on ${escapeHtml(source)} &rarr;
        </a>` : ""}
      </div>
    `;
  }

  let text = String(raw).trim();

  // Decode common HTML entities first so we can properly inspect contents
  text = decodeHtmlEntities(text);

  // If text contains rich HTML tags, sanitize and render cleanly
  const hasFullHtml = /<\s*(p|ul|ol|li|h[1-6]|div|br|span|section|article)\b[^>]*>/i.test(text);
  if (hasFullHtml) {
    return sanitizeHtml(text);
  }

  // Normalize any stray <br> or <p> tags into newlines for clean parsing
  text = text.replace(/<\s*br\s*\/?>/gi, "\n");
  text = text.replace(/<\/\s*p\s*>/gi, "\n\n");
  text = text.replace(/<\s*p\b[^>]*>/gi, "");

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
