# Job Search Launcher

A modern, high-contrast, split-screen job search engine and multi-platform aggregator powered by **Google Gemini 2.5 Flash** and **Apify Actors**.

## Features

- **Multi-Platform Search & Aggregation**:
  - LinkedIn (`curious_coder~linkedin-jobs-scraper`)
  - Indeed (`curious_coder~indeed-scraper`)
  - Glassdoor (`curious_coder~glassdoor-jobs-scraper`)
  - Google Jobs (`johnvc~Google-Jobs-Scraper`)
  - ZipRecruiter (`memo23~apify-ziprecruiter-scraper`)
- **Describe to AI (Gemini 2.5 Flash)**:
  - Input natural language descriptions of your career goals or role preferences.
  - Automatically extracts optimized keywords, must-have skills, any-of alternatives, exclusions, work types, and seniority levels.
- **URL & Query Parameter Generator**:
  - Live query breakdown and direct tab openers for all 5 platforms.
- **High-Contrast 3-Column Layout**:
  - Left: Search inputs, tag builders, segmented filters, and AI prompt.
  - Middle: Job results list with real-time filtering, sorting, and CSV/JSON export.
  - Right: Sticky detail pane with formatted markdown job descriptions, real bullet points, and quick apply buttons.
- **Zero-Dependency Architecture**:
  - Pure vanilla HTML5, CSS3, and JavaScript (ES6+). No frameworks, no build step.

## Getting Started

1. Clone or download the repository.
2. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```
3. Open `config.js` and add your API credentials:
   ```javascript
   window.ENV = {
     APIFY_TOKEN: "YOUR_APIFY_TOKEN",
     GEMINI_API_KEY: "YOUR_GEMINI_API_KEY"
   };
   ```
4. Open `index.html` in your browser (or use VS Code Live Server / `python3 -m http.server 5500`).

## Security

API credentials (`config.js` and `.env`) are excluded from version control via `.gitignore`. Never commit your real tokens to public repositories.
