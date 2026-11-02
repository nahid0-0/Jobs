# RoleRadar design guide

This file is the visual and interaction contract for changes to RoleRadar. Read it before changing any page UI. The goal is to make the existing product clearer and more consistent, not to replace its visual language with a new concept.

## Product and visual direction

RoleRadar is a practical job-search and job-tracking tool. Its interface should feel like a focused desktop utility: calm, legible, compact, and direct. Content and controls should take priority over decoration.

The established visual language is a light, high-contrast interface:

- Page background is a very light cool gray (`--bg-page: #f8fafc`); cards are white.
- Text is dark ink/slate, with clear contrast. Supporting copy remains readable rather than washed out.
- Borders are thin and cool gray. Cards use subtle shadows, not dramatic elevation.
- Blue is the main action/accent color. Platform colors identify job sources and should stay tied to those sources.
- The typeface is the system sans stack. Use the existing monospace token only for technical values such as API credentials and URLs.
- Geometry is restrained: mostly 6–12px component radii, with full pills only where the existing UI uses them (tags and compact filters).
- Motion is brief and functional (`--transition: 0.15s ease`). Avoid decorative animation.

Do not add gradients, glass effects, neon colors, oversized rounded cards, decorative blobs, random illustrations, emoji decoration, or a second visual theme. Avoid pure-black page backgrounds, low-contrast gray copy, and arbitrary one-off colors. Do not introduce a new font or icon library for a small UI change.

## Design tokens and component styling

Use the CSS custom properties at the top of `style.css` instead of scattering new color values:

| Purpose | Existing token / value |
| --- | --- |
| Page / card / muted surfaces | `--bg-page`, `--bg-card`, `--bg-subtle`, `--bg-muted` |
| Main and supporting text | `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-muted` |
| Borders | `--border-light`, `--border-card`, `--border-input`, `--border-hover`, `--border-focus` |
| Primary action | `--primary`, `--primary-hover`, `--primary-fg` |
| Accent action | `--accent`, `--accent-hover`, `--accent-light` |
| Search action | `--search-btn-bg`, `--search-btn-hover`, `--search-btn-fg` |
| AI section | `--ai-border`, `--ai-bg`, `--ai-accent` |
| Component corners | `--radius-xs` through `--radius-lg`, `--radius-full` |
| Elevation and timing | `--shadow-card`, `--shadow-btn`, `--transition` |

When a genuinely new semantic color is needed, add a named token to `:root` and use it consistently. Do not use inline styles for new visual rules; existing HTML has some legacy inline styling that should only be removed when the associated UI is being refactored.

Reuse existing component classes and states where they fit: `.form-card`, `.results-card`, `.job-item`, `.detail-pane`, `.text-input`, `.select-control`, `.segment-btn`, `.chip`, `.badge-source`, `.btn-*`, and `.empty-*`. Define hover, active, disabled, selected, loading, success, error, and focus-visible states intentionally. Keep focus clearly visible; do not remove keyboard focus styling or rely on color alone to show selection.

## Shared application shell

All pages share the docked left vertical navigation bar (`.sidebar-nav` within `.app-layout`):
- **Brand block** at top left: yellow radar icon, RoleRadar brand mark, and version/state pill.
- **Main Navigation menu**:
  - **Homepage** (`home.html`): High-level overview, quick search launcher, KPI cards, and spotlight roles.
  - **Dashboard** (`dashboard.html`): Aggregated market metrics, platform distribution, compensation benchmarks, and hiring trends.
  - **Job Search** (`index.html`): Primary 3-column scraper launcher with Gemini AI prompt generator and split-screen results.
  - **Daily Jobs** (`daily-jobs.html`): Incoming daily feed with one-click Save to All Jobs.
  - **All Jobs** (`all-jobs.html`): Curated master library with export and deletion tools.
- **Intelligence menu**:
  - **Talk to Data** (`talk-to-data.html`): Natural language conversational AI querying indexed job postings via LangGraph RAG and ChromaDB.
- **Footer area**:
  - **API Keys** trigger opening the shared credentials modal with configured/not-set indicators.
  - **System status** chip displaying live engine state.

Keep the active destination visually distinct with `.sidebar-link.active`. Preserve identical brand mark, nav order, component heights, and spacing across all pages.

The job-library pages use the established master/detail pattern:
- Left: a results card with title/count, clear and export actions, filter/sort controls, then a scrollable list.
- Right: a job detail pane with an empty selection state and a selected-job state.
- Job selection is visible in the list and reflected in the detail pane.
- Primary apply action is prominent; save/remove and copy actions are secondary.

Search uses a desktop composition with the vertical sidebar on the left and a three-column work surface: search form on the left, results list in the middle, and job detail on the right.

## Page-specific guidance

### Homepage (`home.html`)

The central welcoming entry point. Features the autonomous career search bar, quick starting presets, key KPI cards, capability navigation tiles, and spotlight recent positions.

### Dashboard (`dashboard.html`)

Desktop analytics engine calculating real-time figures from the job dataset: platform distribution bars, workplace flexibility ratios (remote vs on-site), top paying opportunities table, top hiring employers, and in-demand skills analysis.

### Search (`index.html`)

This is the main work surface. Keep the form dense but organized into clear groups. Preset pills are quick starting points; the AI description panel is a supporting tool, not the dominant page hero. Keywords and location are the main inputs. Tag groups retain their meaning and distinct existing treatment: required (`must`), alternatives (`any`), and exclusions (`exclude`). Platform pills use source identity colors when active.

### Daily Jobs (`daily-jobs.html`)

This page is a daily incoming-results list with the shared detail pane. Its key list action is Save to All Jobs.

### All Jobs (`all-jobs.html`)

This is the saved master list. Its key list action is Remove from All Jobs. Keep clear/export controls and filtering/sorting grouped above the list.

### Talk to Data (`talk-to-data.html`)

Conversational career intelligence interface connected to the FastAPI LangGraph RAG server (`/api/rag/query`). Features user/assistant bubbles, cited job postings with company and salary badges, collapsible retrieval reasoning, and fallback client-side semantic matching.

### Settings modal

The API Keys modal is shared across pages. Keep it a focused, compact dialog with a clear title, short explanatory text, labeled password inputs, configured/not-set status badges, help links, and footer actions. Preserve the established primary (Save), secondary (Cancel), and destructive (Clear Keys) hierarchy. Keep dialog semantics and close affordances intact.

## Layout and responsive behavior

The existing layouts are desktop-first. At widths below 1200px, search moves to a full-width row and the result/detail areas adapt to two columns. Below 900px, the main layouts become one column and the result/detail panes return to normal document flow. Preserve these breakpoints and behavior unless a concrete usability issue requires a measured adjustment.

At narrow widths:

- Keep every control reachable without horizontal page overflow.
- Allow button groups, source pills, and action bars to wrap cleanly.
- Keep form fields full-width when their paired layout no longer fits.
- Preserve readable job titles, metadata, and detail descriptions; truncate only when the full text remains available through selection or another clear affordance.
- Do not make the sticky/scrolling desktop panes trap content on mobile.

The stylesheet currently hides scrollbars globally while keeping scrolling enabled. Do not add further scrollbar suppression. When modifying scrolling, ensure the user can still discover that a region scrolls and can reach its full contents with mouse, touch, and keyboard.

## Interaction and content rules

- Keep existing IDs, data attributes, and event hooks stable when restyling markup; `app.js` and `jobs-view.js` bind directly to them.
- Preserve the distinction between selected, saved, active, disabled, and loading states.
- Use buttons for actions and links for navigation or external destinations. Keep labels explicit; icon-only controls need an accessible name/title.
- Keep empty, loading, success, and error states in the same visual system as the surrounding page.
- Use concise, literal interface copy. Avoid marketing language, jokes, decorative slogans, and placeholder copy that could be mistaken for real job data.
- Keep source/platform badges consistent with the source-specific mapping used by the JavaScript. Do not invent colors for a platform or reuse platform colors for unrelated meanings.
- Do not insert fabricated job listings or fake metrics as visual filler.

## Implementation guardrails for agents

Before changing a page, inspect its existing HTML structure, relevant `style.css` rules, and the JavaScript that populates or controls it. This project uses plain HTML/CSS/JavaScript, not a component framework; make the smallest coherent change in the existing structure.

For any new UI:

1. Reuse the shared shell, spacing, tokens, and component patterns above.
2. Add styles to `style.css`, preferably beside the related component rules; do not create page-local style islands or add inline CSS.
3. Match the visual weight to the action: one clear primary action per region, supporting actions subdued, destructive actions reserved for destructive work.
4. Include responsive, keyboard-focus, hover, disabled, and relevant feedback states.
5. Preserve existing functional selectors and data flow. Avoid broad restyling unrelated pages as collateral.

If a proposed visual direction conflicts with this guide, do not silently improvise. Follow this guide unless the user explicitly asks for a redesign or a different visual direction.
