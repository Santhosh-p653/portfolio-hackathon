# Implementation Plan

- [ ] 1. Scaffold the page structure in index.html
  - Build semantic shell: `<header>` with name + primary `<nav>` (About, Skills, Projects, Contact) and the visible "supershell" terminal hint button.
  - Add `<main>` with four anchored sections: `#about`, `#skills`, `#projects`, `#achievements`, plus `<footer>`.
  - Link `style.css` in `<head>` and `app.js` (deferred) before `</body>`; add meta viewport + title/description.
  - _Requirements: 1.4, 2.3, 3.4, 4.5, 5.1, 6.1, 6.2_

- [ ] 2. Author About section content
  - Add name, tagline, location, 2–3 sentence summary (CSE student; agentic AI, ML systems, cloud/DevOps).
  - Add action row: "View projects", "Download résumé" linking to `santhosh p.pdf`, and LinkedIn/GitHub/email links with accessible labels.
  - _Requirements: 1.1, 1.2, 1.3, 6.4_

- [ ] 3. Author Skills section content
  - Render six groups as cards: Languages; AI/ML; Databases; Frameworks; DevOps & Tools; Cloud & Data.
  - Populate chips exactly from resume for each group.
  - _Requirements: 2.1, 2.2_

- [ ] 4. Author Projects section content
  - Add three project cards: Deepfake-Agentic-AI, Multimodal RAG Assistant, doc2site.
  - Each: title, tech stack, timeframe, 2–3 metric-bearing highlight bullets.
  - _Requirements: 3.1, 3.2_

- [ ] 5. Author Achievements / Contact section content
  - Leadership (CloudWeld Technical Lead, UG Madurai #1 + AWSBlocks, Techtronautz) and competitive programming (500+ LeetCode, 200+ CodeChef, 50+ hackathons, Top 10 UG Builder Circle, ICPC 2026–27).
  - Contact block (email, LinkedIn, GitHub, location) + résumé download; footer with repeat terminal hint.
  - _Requirements: 3.3, 3.4, 1.3, 6.4_

- [ ] 6. Implement the theme and layout in style.css
  - Define `:root` design tokens (dark developer theme, accent color); base typography with monospace fallback stack.
  - Lay out header/nav, hero, skills grid, project cards, achievements, footer with flex/grid; max width ~1000px.
  - Add responsive breakpoint (~720px): nav collapse, single-column cards.
  - Add visible focus styles and honor `prefers-reduced-motion`.
  - _Requirements: 5.2, 5.4, 6.1_

- [ ] 7. Build core navigation behavior in app.js
  - Smooth-scroll nav links; active-link highlight via IntersectionObserver.
  - Mobile menu toggle for collapsed nav.
  - Define the shared `CONTENT` data map (about, skills, projects, achievements, contact) used by both page and terminal.
  - _Requirements: 5.1, 5.2_

- [ ] 8. Build the supershell terminal UI
  - Add the terminal overlay markup to index.html (`role="dialog"`, output region with `aria-live="polite"`, prompt + input line, close button); hidden by default.
  - Style terminal in style.css (console look, window chrome, blinking caret, full-screen-ish on mobile).
  - _Requirements: 4.1, 4.6, 4.7, 5.3, 5.4_

- [ ] 9. Implement the terminal engine in app.js
  - open/close functions with focus management; open via hint button click and backtick key; close via Esc, close button, and `exit`.
  - `runCommand` parser that echoes input, renders output, and autoscrolls; wrap handlers so no uncaught errors.
  - Command history with Up/Down arrow navigation.
  - _Requirements: 4.1, 4.4, 4.6, 5.3_

- [ ] 10. Implement terminal commands and easter eggs
  - Implement `help`, `about`, `skills`, `projects` (+ `projects <name>`), `achievements`, `contact`, `resume`, `clear`, `exit` reading from `CONTENT`.
  - Implement easter eggs (`whoami`, `sudo`, `motto`, `banner`) revealing a personal/surprising fact.
  - Unknown command → friendly hint pointing to `help`.
  - _Requirements: 4.2, 4.3_

- [ ] 11. Add AWS Amplify static-hosting config
  - Create `amplify.yml` for a no-build static deploy (empty build commands, baseDirectory root, publish all files).
  - _Requirements: 7.1, 7.3, 6.2_

- [ ] 12. Prepare repository and .gitignore
  - Ensure `.gitignore` excludes tooling artifacts (`__pycache__/`, `*.pyc`, `extract_resume.py`, `resume_text.txt`, `.kiro/tmp/`).
  - Confirm root contains the three site files + résumé PDF + `amplify.yml` + spec.
  - _Requirements: 6.1, 8.2, 8.3_

- [ ] 13. Verify locally
  - Manual pass of the testing strategy: nav + active highlight, all four sections resume-accurate, terminal open/close + all commands + easter egg + history, résumé download, responsive at 375/720/desktop, keyboard-only nav, content readable with terminal closed.
  - _Requirements: 1–6 (all acceptance criteria)_

- [ ] 14. Initialize git and push to GitHub repo `techsupercharge`
  - `git init`, stage site files + résumé + `amplify.yml` + spec, commit, create public GitHub repo `techsupercharge`, push to a branch and open the default branch.
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 15. Deploy on AWS Amplify Hosting
  - Connect the `techsupercharge` repo to Amplify Hosting (main branch), deploy as static (no build), confirm the public live URL loads over HTTPS and all core + creative features work in production.
  - _Requirements: 7.1, 7.2, 7.4_
```
