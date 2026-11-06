# Portfolio — Santhosh P

A fast, dependency-free personal portfolio site with a terminal theme and a hidden interactive **supershell** you can type commands into. Built for a hackathon and deployed as a static site.

**Live site:** https://santhosh-p653.github.io/portfolio-hackathon/

## Features

- **Single-page portfolio** — About, Skills, Projects, and Achievements sections.
- **supershell terminal** — press the <kbd>`</kbd> (backtick) key or click **supershell** to open an in-page terminal. Type `help` to see commands like `about`, `skills`, `projects`, `contact`, plus a few easter eggs (`whoami`, `motto`, `banner`).
- **Responsive & accessible** — mobile nav, skip link, ARIA roles, keyboard navigation, and command history (↑ / ↓).
- **Zero dependencies** — plain HTML, CSS, and vanilla JavaScript. No build step.

## Tech stack

- HTML5 / CSS3 (custom terminal-inspired styling, JetBrains Mono + Inter)
- Vanilla JavaScript (no frameworks, no bundler)
- `extract_resume.py` — a small [pypdf](https://pypi.org/project/pypdf/) utility that extracts text from a résumé PDF into plain text

## Project structure

```
.
├── index.html          # Page markup and all sections
├── style.css           # Styling and layout
├── app.js              # Interactions + the supershell terminal
├── extract_resume.py   # Utility: PDF résumé -> text (run locally)
├── amplify.yml         # AWS Amplify static-hosting config
└── README.md
```

## Run locally

It's a static site, so any static server works. From the project root:

```bash
# Python
python -m http.server 8000
# then open http://localhost:8000
```

To regenerate résumé text from a PDF (requires `pip install pypdf` and a local `santhosh p.pdf`):

```bash
python extract_resume.py
```

## Deployment

The site is static and can be hosted anywhere. Two setups are included:

- **GitHub Pages** — served from the `main` branch root.
- **AWS Amplify** — `amplify.yml` publishes the repo root as-is (no build step).

## Notes

- The résumé PDF (`santhosh p.pdf`) and its extracted text are intentionally **not** committed (they contain personal contact details). As a result, the site's "Download résumé" link will not resolve on the public deployment unless a résumé file is added.
- A `.kiro/` directory holds workspace tooling and is not part of the site.
