// RoleRadar - Multi-Page Job Viewer (Daily Jobs & All Jobs)
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

// Platform Logo SVGs
const LINKEDIN_ICON_SVG = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.62 1.62 0 0 0-1.62 1.62c0 .9.72 1.63 1.62 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62z"/></svg>`;
const INDEED_ICON_SVG = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11.56 0C5.17 0 0 5.17 0 11.56c0 6.39 5.17 11.56 11.56 11.56 6.39 0 11.56-5.17 11.56-11.56C23.12 5.17 17.95 0 11.56 0zm3.84 17.51h-2.18V8.98c0-.73-.25-1.28-.96-1.28-.68 0-1.04.53-1.04 1.28v8.53H9.04V8.98c0-.73-.25-1.28-.96-1.28-.68 0-1.04.53-1.04 1.28v8.53H4.86V7.47h2.18v1.07c.56-.8 1.41-1.23 2.37-1.23 1.13 0 2.05.58 2.45 1.55.61-.97 1.61-1.55 2.76-1.55 1.76 0 2.78 1.18 2.78 3.19v6.01z"/></svg>`;
const GLASSDOOR_ICON_SVG = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.63 17.25H6.37v-2.25h11.26v2.25zm0-4.13H6.37v-2.25h11.26v2.25zm0-4.12H6.37V6.75h11.26v2.25z"/></svg>`;
const GOOGLE_ICON_SVG = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>`;
const ZIPRECRUITER_ICON_SVG = `<svg class="platform-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;

const LINKEDIN_ICON_MD = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.62 1.62 0 0 0-1.62 1.62c0 .9.72 1.63 1.62 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62z"/></svg>`;
const INDEED_ICON_MD = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.56 0C5.17 0 0 5.17 0 11.56c0 6.39 5.17 11.56 11.56 11.56 6.39 0 11.56-5.17 11.56-11.56C23.12 5.17 17.95 0 11.56 0zm3.84 17.51h-2.18V8.98c0-.73-.25-1.28-.96-1.28-.68 0-1.04.53-1.04 1.28v8.53H9.04V8.98c0-.73-.25-1.28-.96-1.28-.68 0-1.04.53-1.04 1.28v8.53H4.86V7.47h2.18v1.07c.56-.8 1.41-1.23 2.37-1.23 1.13 0 2.05.58 2.45 1.55.61-.97 1.61-1.55 2.76-1.55 1.76 0 2.78 1.18 2.78 3.19v6.01z"/></svg>`;
const GLASSDOOR_ICON_MD = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.63 17.25H6.37v-2.25h11.26v2.25zm0-4.13H6.37v-2.25h11.26v2.25zm0-4.12H6.37V6.75h11.26v2.25z"/></svg>`;
const GOOGLE_ICON_MD = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>`;
const ZIPRECRUITER_ICON_MD = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;

function getPlatformMeta(source) {
  const s = String(source || "").toLowerCase();
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
  const pageMode = document.body.dataset.page || "daily-jobs"; // "daily-jobs" or "all-jobs"
  const isDaily = pageMode === "daily-jobs";

  // Elements
  const rfInput = document.getElementById("rf");
  const rsSelect = document.getElementById("rs");
  const jobListEl = document.getElementById("job-list");
  const resultsCountEl = document.getElementById("results-count");

  // API Keys Modal Elements
  const btnOpenSettings = document.getElementById("btn-open-apikeys");
  const btnCloseSettings = document.getElementById("btn-close-settings");
  const btnCancelSettings = document.getElementById("btn-cancel-settings");
  const btnSaveSettings = document.getElementById("btn-save-settings");
  const btnClearSettings = document.getElementById("btn-clear-settings");
  const settingsModal = document.getElementById("settings-modal");
  const inputApifyToken = document.getElementById("setting-apify-token");
  const inputGeminiKey = document.getElementById("setting-gemini-key");
  const statusApify = document.getElementById("status-apify");
  const statusGemini = document.getElementById("status-gemini");
  const settingsAlert = document.getElementById("settings-alert");

  // Load initial data
  if (window.SCRAPED_JOBS && Array.isArray(window.SCRAPED_JOBS) && window.SCRAPED_JOBS.length > 0) {
    jobs = [...window.SCRAPED_JOBS];
  } else {
    try {
      const stored = localStorage.getItem("roleRadar_jobs");
      if (stored) jobs = JSON.parse(stored);
    } catch (e) {
      jobs = [];
    }
  }

  // Render Job List
  function renderJobs() {
    if (!jobListEl) return;
    const filterText = (rfInput ? rfInput.value.toLowerCase().trim() : "");
    const sortBy = (rsSelect ? rsSelect.value : "newest");

    let filtered = jobs.filter(j => {
      if (!filterText) return true;
      const haystack = [
        j.title,
        j.company,
        j.location,
        j.source,
        j.description,
        ...(Array.isArray(j.tags) ? j.tags : [])
      ].join(" ").toLowerCase();
      return haystack.includes(filterText);
    });

    if (sortBy === "company") {
      filtered.sort((a, b) => (a.company || "").localeCompare(b.company || ""));
    } else if (sortBy === "source") {
      filtered.sort((a, b) => (a.source || "").localeCompare(b.source || ""));
    }

    if (resultsCountEl) {
      resultsCountEl.textContent = `(${filtered.length} position${filtered.length === 1 ? "" : "s"})`;
    }

    if (filtered.length === 0) {
      jobListEl.innerHTML = `
        <div class="empty-list-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke-width="1.8">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <p style="font-size: 13.5px; font-weight: 700; color: #000000;">No jobs found.</p>
          <p style="font-size: 12px; max-width: 260px; color: #334155; line-height: 1.5;">
            ${isDaily ? "No daily jobs available matching this filter." : "No saved jobs available in this view."}
          </p>
        </div>
      `;
      return;
    }

    jobListEl.innerHTML = filtered.map(job => {
      const meta = getPlatformMeta(job.source);
      const isSelected = String(job.id) === String(selectedJobId);
      const salaryHtml = job.salary ? `<span class="job-salary-tag">${escapeHtml(job.salary)}</span>` : "";

      // Solid Green Save Button for Daily Jobs; Solid Red Remove Button for All Jobs
      const actionButtonHtml = isDaily ? `
        <button type="button" class="btn-job-action btn-job-save" onclick="handleJobSave(event, '${job.id}')" title="Save job to All Jobs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Save</span>
        </button>
      ` : `
        <button type="button" class="btn-job-action btn-job-remove" onclick="handleJobRemove(event, '${job.id}')" title="Remove job">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>Remove</span>
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
            ${actionButtonHtml}
          </div>
        </div>
      `;
    }).join("");
  }

  // Placeholder action handlers (backend logic deliberately omitted for now)
  window.handleJobSave = function(event, jobId) {
    event.stopPropagation();
    const btn = event.currentTarget;
    if (btn) {
      btn.classList.toggle("saved");
      const span = btn.querySelector("span");
      if (span) {
        span.textContent = btn.classList.contains("saved") ? "Saved" : "Save";
      }
    }
  };

  window.handleJobRemove = function(event, jobId) {
    event.stopPropagation();
    // Visual placeholder for remove button
    const btn = event.currentTarget;
    const item = btn ? btn.closest(".job-item") : null;
    if (item) {
      item.style.opacity = "0.5";
      setTimeout(() => {
        item.style.opacity = "1";
      }, 500);
    }
  };

  // Filter & Sort
  if (rfInput) rfInput.addEventListener("input", renderJobs);
  if (rsSelect) rsSelect.addEventListener("change", renderJobs);

  // Clear Results
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
    });
  }

  // Export CSV
  const btnExportCsv = document.getElementById("btn-export-csv");
  if (btnExportCsv) {
    btnExportCsv.addEventListener("click", () => {
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
      const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `roleradar-${pageMode}-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Export JSON
  const btnExportJson = document.getElementById("btn-export-json");
  if (btnExportJson) {
    btnExportJson.addEventListener("click", () => {
      if (jobs.length === 0) return alert("No jobs to export.");
      const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `roleradar-${pageMode}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Settings Modal Handlers
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

    if (apifyVal) localStorage.setItem(STORAGE_KEY_APIFY, apifyVal);
    else localStorage.removeItem(STORAGE_KEY_APIFY);

    if (geminiVal) localStorage.setItem(STORAGE_KEY_GEMINI, geminiVal);
    else localStorage.removeItem(STORAGE_KEY_GEMINI);

    updateSettingsStatus();

    if (settingsAlert) {
      settingsAlert.className = "window-alert success";
      settingsAlert.textContent = "API credentials saved to browser storage.";
      settingsAlert.style.display = "flex";
    }

    setTimeout(() => { closeSettingsModal(); }, 600);
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

  // Toggle Visibility
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

  // Initial render
  updateSettingsStatus();
  renderJobs();
  if (jobs.length > 0) {
    selectJob(jobs[0].id);
  }
});

// Select Job and display in detail pane
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
  if (copyBtn) {
    copyBtn.onclick = function() {
      navigator.clipboard.writeText(job.url || window.location.href);
      const orig = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = orig; }, 1500);
    };
  }

  // Full Job Description
  const descEl = document.getElementById("detail-description");
  if (descEl) {
    descEl.innerHTML = formatJobDescription(job.description, job);
  }
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
  text = decodeHtmlEntities(text);

  const hasFullHtml = /<\s*(p|ul|ol|li|h[1-6]|div|br|span|section|article)\b[^>]*>/i.test(text);
  if (hasFullHtml) {
    return sanitizeHtml(text);
  }

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

    const headerMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      flushParagraph();
      flushList();
      underListSection = isListHeading(headerMatch[2]);
      const level = Math.min(6, headerMatch[1].length + 1);
      output.push(`<h${level} class="jd-section-title">${formatInline(headerMatch[2])}</h${level}>`);
      continue;
    }

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

    if (isHeaderLine(trimmed, nextTrimmed)) {
      flushParagraph();
      flushList();
      underListSection = isListHeading(trimmed);
      const cleanHeader = trimmed.replace(/^\*\*|\*\*$/g, "").trim();
      output.push(`<h4 class="jd-section-title">${formatInline(cleanHeader)}</h4>`);
      continue;
    }

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

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

