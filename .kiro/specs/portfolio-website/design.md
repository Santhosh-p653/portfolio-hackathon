# Design Document

## Overview

The portfolio is a single static page built from three files: `index.html`, `style.css`, and `app.js`. It renders four core content sections (About, Skills, Projects, Achievements/Contact) with persistent responsive navigation, and layers an interactive creative feature on top: **supershell**, an in-browser command-line terminal that visitors open via a visible hint to explore Santhosh's story.

Everything runs client-side. No backend, no build step. Deployment is to AWS Amplify Hosting pulling from the GitHub repo `techsupercharge`, served over Amplify's CloudFront-backed global CDN. The resume PDF ships as a downloadable asset.

### Design goals
- Core content is fully usable with JavaScript disabled or the terminal closed.
- The terminal is opt-in and dismissible so it never blocks navigation (Req 4.6, 5.3).
- On-brand aesthetic: a developer/terminal-inspired dark theme that matches Santhosh's Linux/DevOps/agentic-AI identity.
- Fast, dependency-light, accessible.

## Architecture

```
index.html ── semantic structure + content (nav, sections, terminal shell, hint button)
   │
   ├── style.css ── theme tokens, layout (grid/flex), responsive breakpoints, terminal styling
   │
   └── app.js ── nav behavior, smooth scroll/active link, terminal engine (command parser,
                 history, output rendering), open/close + keyboard shortcut, easter eggs
```

Single document; sections are anchored (`#about`, `#skills`, `#projects`, `#achievements`). The terminal is a hidden overlay panel toggled by a button and the backtick (`` ` ``) key.

### Technology choices
- Vanilla HTML/CSS/JS only. No framework, no bundler (satisfies Req 6.2).
- Optional CDN for a monospace font (e.g. a Google Fonts `JetBrains Mono`/`Fira Code`); site degrades gracefully to system monospace if offline (Req 6.3).
- No icon library dependency required; use inline SVG or Unicode for small accents.

## Content model

Content is authored directly in `index.html`. The terminal’s responses are defined as a small data map in `app.js` so the same facts can be surfaced both visually and via commands (single source of truth for terminal text).

```js
// app.js — terminal content map (illustrative)
const CONTENT = {
  about:        "...short bio...",
  skills:       { Languages: [...], "AI/ML": [...], Databases: [...], Frameworks: [...], "DevOps & Tools": [...], "Cloud & Data": [...] },
  projects:     [ { name, stack, period, bullets:[...] }, ... ],
  achievements: [ "...", ... ],
  contact:      { email, linkedin, github, location }
};
```

## Components and Interfaces

### 1. Header / Navigation
- Sticky top bar: name/logo on the left, nav links (About · Skills · Projects · Contact) on the right.
- A clearly labeled **terminal hint**: a button reading e.g. `⌨ supershell — press \` to open`. This is the visible hint required by Req 4.5.
- Responsive: collapses to a compact menu under a mobile breakpoint (~720px). Nav uses `<nav aria-label="Primary">` with anchor links.
- Active-section highlighting via IntersectionObserver in `app.js`.

### 2. Hero / About section (`#about`)
- Name, one-line tagline ("CSE student building explainable agentic AI & cloud systems"), location, short 2–3 sentence summary.
- Action row: "View projects", "Download résumé" (links to `santhosh p.pdf`), and social links (LinkedIn, GitHub, email) with accessible labels.

### 3. Skills section (`#skills`)
- Six labeled groups rendered as cards/columns: Languages; AI/ML; Databases; Frameworks; DevOps & Tools; Cloud & Data.
- Each group lists chips/pills. Content matches resume exactly (Req 2.2).

### 4. Projects section (`#projects`)
- Three project cards (Deepfake-Agentic-AI, Multimodal RAG Assistant, doc2site).
- Card: title, tech stack line, timeframe, 2–3 highlight bullets (condensed from resume, metrics preserved: 94% accuracy, 98% retrieval, 15+ live sites).

### 5. Achievements / Contact section (`#achievements`)
- Leadership: CloudWeld Technical Lead; UG Madurai #1 (2+ months), organized AWSBlocks (72 participants); Techtronautz co-organizer.
- Competitive programming: 500+ LeetCode, 200+ CodeChef, 25+ contests, ICPC 2026–27 registered, 50+ hackathons, Top 10 UG Builder Circle.
- Contact block with the same links as About plus the résumé download.
- Footer with copyright and a repeat terminal hint.

### 6. supershell terminal (creative feature)
Overlay panel, hidden by default (`hidden`/`aria-hidden`), structured as:
```
<section id="supershell" role="dialog" aria-label="supershell terminal" aria-modal="false" hidden>
  <div class="term-output" aria-live="polite"></div>
  <form class="term-input-line">
    <span class="prompt">santhosh@portfolio:~$</span>
    <input class="term-input" aria-label="terminal command input" autocomplete="off" />
  </form>
</section>
```

**Engine (`app.js`):**
- `openTerminal()` / `closeTerminal()` toggle visibility; focus moves into the input on open, returns to the hint button on close.
- Open triggers: click the hint button, press `` ` `` (backtick) anywhere outside a text field. Close: `Esc`, a close button, or `exit` command.
- `runCommand(raw)`: trims/normalizes, looks up a command handler, appends an output block to `.term-output`, and autoscrolls.
- **History:** array of entered commands; Up/Down arrows cycle through it (Req 4.4).
- **Rendering:** each entry echoes the prompt + typed command, then the response (supports multi-line and simple inline links).

**Command set:**
| Command | Behavior |
|---|---|
| `help` | Lists available commands |
| `about` | Prints the bio |
| `skills` | Prints grouped skills |
| `projects` | Lists projects (with `projects <name>` for detail) |
| `achievements` | Prints achievements |
| `contact` | Prints contact links |
| `resume` | Prints/links the résumé download |
| `clear` | Clears output |
| `exit` | Closes the terminal |
| Easter eggs | `whoami`, `sudo`, `motto`, `banner` — reveal a personal/surprising fact (e.g. motto, ASCII banner). `sudo` returns a playful "nice try" line. (Req 4.2) |
| unknown | Friendly message pointing to `help` (Req 4.3) |

The terminal reads from the same `CONTENT` map as the page, so facts never drift.

## Styling and theme

- CSS custom properties for a dark developer theme: background near-black, accent (terminal green/cyan), readable foreground. Tokens defined in `:root`.
- Layout via CSS grid/flex; max content width ~1000px; generous spacing.
- Terminal styled like a real console (monospace, blinking caret, prompt color), with a subtle window chrome (title bar + traffic-light dots).
- Responsive breakpoints at ~720px (nav collapse, single-column cards). Terminal becomes full-width near-full-height on small screens but still closable.
- Respect `prefers-reduced-motion` (disable caret blink / smooth-scroll where set).

## Accessibility

- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>` with headings, `<footer>`.
- All interactive controls keyboard-operable; visible focus states.
- Terminal: `aria-live="polite"` on output, labeled input, `Esc` to close, focus management on open/close.
- Color contrast checked against WCAG AA for text; note that full WCAG conformance requires manual assistive-tech testing.
- Images/links have alt text / accessible names; résumé link is descriptive.

## Deployment (AWS)

- **Service:** AWS Amplify Hosting, connected to the GitHub repo `techsupercharge` (main branch), auto-deploy on push.
- **Build:** no build step — static files served from repo root. An `amplify.yml` declares an empty build and sets `baseDirectory` to the repo root so Amplify publishes the static assets as-is.
- **Delivery:** Amplify serves via its managed CloudFront CDN → global, HTTPS, public live URL (Req 7.2).
- **Assets:** `index.html`, `style.css`, `app.js`, `santhosh p.pdf` published; tooling files excluded.

```yaml
# amplify.yml (static, no build)
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
  cache:
    paths: []
```

## Repository

- Git repo pushed to public GitHub repo `techsupercharge`.
- `.gitignore` excludes Python/tooling artifacts (`__pycache__`, `*.pyc`, extraction scripts, generated `resume_text.txt`, `.kiro/tmp`).
- Root contains the three site files + résumé PDF + `amplify.yml` + the `.kiro` spec.

## Error handling

- Terminal: unknown commands → guidance to `help`; empty input → no-op; never throws uncaught errors (wrap handlers).
- Missing CDN font → system monospace fallback via `font-family` stack.
- Missing PDF (unlikely) → link still renders; browser shows its own 404 only if asset absent.

## Testing strategy

Manual verification (no test framework is added per project constraints):
1. Each nav link scrolls to the correct section; active highlight updates.
2. All four core sections present with resume-accurate content.
3. Terminal opens via button and backtick; closes via Esc/close/`exit`; focus returns correctly.
4. Each command (`help`, `about`, `skills`, `projects`, `achievements`, `contact`, `resume`, `clear`) produces correct output; unknown command shows hint; at least one easter egg works; Up/Down history works.
5. Résumé download link works.
6. Responsive check at mobile (~375px), tablet (~720px), desktop widths.
7. Keyboard-only navigation of nav and terminal.
8. Core content readable with terminal closed and with JS disabled (sections still render).
9. After deploy: live Amplify URL loads over HTTPS and all of the above hold.
