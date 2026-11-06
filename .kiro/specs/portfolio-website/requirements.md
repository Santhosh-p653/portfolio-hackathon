# Requirements Document

## Introduction

This spec defines a personal portfolio website for **Santhosh P**, a B.E. Computer Science student at Karpagam Institute of Technology specializing in agentic AI, ML systems, and cloud/DevOps engineering. The site is an entry for the AWS "Build Your Portfolio" hackathon and must be deployed globally on AWS (Amplify Hosting), backed by a public GitHub repository named `techsupercharge`.

The portfolio tells Santhosh's story, showcases his skills and projects, and includes one interactive creative feature that reveals something unique about him. The creative feature is an in-browser **command-line terminal** ("supershell") that visitors type into to explore his projects, skills, and personality. This fits his Linux/DevOps background and gives a memorable, on-brand twist without getting in the way of normal navigation.

The build must use only the three existing front-end files (`index.html`, `style.css`, `app.js`) plus the provided resume PDF. No additional source files are created beyond what deployment/tooling strictly requires.

### Source material
- Name: Santhosh P — Coimbatore, Tamil Nadu, India
- Contact: +91 9715803110, santhosh11042007@gmail.com, LinkedIn, GitHub
- Education: Karpagam Institute of Technology, B.E. CSE (2024–Present), CGPA 8.72; Jayanthi Matriculation HSS, HSC 91%
- Projects: Deepfake-Agentic-AI, Multimodal RAG Assistant, doc2site
- Skills: Python, C++, Java, SQL, Rust, R; HF Transformers, Ollama, vLLM, MLflow, LangChain, LangGraph; PostgreSQL, Qdrant, pgvector, MongoDB; FastAPI, React, Next.js, Node.js; Docker, Podman, GitHub Actions, Git, Linux; AWS
- Extracurricular: CloudWeld Technical Lead, UG Madurai #1 leaderboard, Techtronautz co-organizer; 500+ LeetCode, 200+ CodeChef, 50+ hackathons, Top 10 UG Builder Circle

## Requirements

### Requirement 1: About Me section
**User Story:** As a visitor, I want to quickly understand who Santhosh is, so that I can gauge his background and focus.

#### Acceptance Criteria
1. WHEN the page loads THEN the site SHALL display an "About Me" section with his name, a short professional summary, and location.
2. THE About section SHALL state his current role (CSE student) and specialization (agentic AI, ML systems, cloud/DevOps).
3. THE About section SHALL include working links to LinkedIn, GitHub, and email.
4. THE About section SHALL be reachable from the primary navigation.

### Requirement 2: Skills / Tech Superpowers section
**User Story:** As a visitor, I want to see Santhosh's technical skills grouped clearly, so that I can assess his capabilities.

#### Acceptance Criteria
1. THE site SHALL display a "Skills" (Tech Superpowers) section grouped into categories: Languages, AI/ML, Databases, Frameworks, DevOps & Tools, Cloud & Data.
2. THE skills SHALL match the resume content exactly for those categories.
3. THE Skills section SHALL be reachable from the primary navigation.

### Requirement 3: Projects / Achievements section
**User Story:** As a visitor, I want to see Santhosh's projects and achievements, so that I can evaluate his real work.

#### Acceptance Criteria
1. THE site SHALL display a "Projects" section containing Deepfake-Agentic-AI, Multimodal RAG Assistant, and doc2site.
2. EACH project card SHALL show the title, tech stack, timeframe, and 1–3 concise highlight bullets drawn from the resume.
3. THE site SHALL display an "Achievements" area covering leadership (CloudWeld Technical Lead, UG Madurai #1, Techtronautz) and competitive programming (500+ LeetCode, 200+ CodeChef, 50+ hackathons, Top 10 UG Builder Circle).
4. THE Projects and Achievements sections SHALL be reachable from the primary navigation.

### Requirement 4: Creative interactive feature — "supershell" terminal
**User Story:** As a visitor, I want to interact with a playful command-line terminal, so that I discover something unique about Santhosh in a memorable way.

#### Acceptance Criteria
1. THE site SHALL provide an interactive in-browser terminal that accepts typed commands and prints responses.
2. THE terminal SHALL support at minimum: `help`, `about`, `skills`, `projects`, `achievements`, `contact`, `clear`, and at least one easter-egg command (e.g. `whoami`, `sudo`, `motto`) that reveals a surprising/personal fact.
3. WHEN a visitor types an unknown command THEN the terminal SHALL respond with a friendly hint pointing to `help`.
4. THE terminal SHALL maintain command history navigable with the Up/Down arrow keys.
5. THE site SHALL show a **visible hint** (e.g. a labeled button or badge such as "Open the terminal" / "Press ` to launch supershell") so visitors can find the feature.
6. THE terminal SHALL be dismissible so it never blocks access to the rest of the site.
7. THE terminal SHALL work fully client-side with no backend dependency.

### Requirement 5: Navigation and usability
**User Story:** As a visitor, I want the portfolio to be easy to navigate, so that the creative feature never gets in the way.

#### Acceptance Criteria
1. THE site SHALL provide persistent primary navigation linking to About, Skills, Projects, and Achievements/Contact.
2. THE navigation SHALL work on mobile and desktop widths (responsive layout).
3. THE creative feature SHALL be opt-in (opened via the visible hint) and SHALL NOT obstruct reading the core sections when closed.
4. THE site SHALL meet basic accessibility practices: semantic landmarks, keyboard operability of interactive controls, sufficient color contrast, and alt text / labels where needed.

### Requirement 6: Single-page implementation constraints
**User Story:** As the owner, I want the site built only from the existing files, so that the repo stays clean per the hackathon instructions.

#### Acceptance Criteria
1. THE implementation SHALL use only `index.html`, `style.css`, and `app.js` for the site, plus the existing resume PDF as a downloadable asset.
2. THE site SHALL NOT require a build step or external runtime; it SHALL run as static files.
3. External libraries, IF used, SHALL be loaded via CDN only (no local package install), and the site SHALL still function if CDNs are reachable.
4. THE resume PDF SHALL be linked for download from the site.

### Requirement 7: AWS global deployment
**User Story:** As the owner, I want the site hosted on AWS at a live URL, so that it meets hackathon submission rules.

#### Acceptance Criteria
1. THE site SHALL be deployable to AWS Amplify Hosting from the GitHub repository.
2. THE deployment SHALL serve the static files globally via Amplify's CDN and load at a public live URL.
3. THE repository SHALL contain any Amplify configuration needed for a static (no-build) deploy.
4. THE site SHALL remain publicly accessible for the judging window.

### Requirement 8: GitHub repository
**User Story:** As the owner, I want the project in a public GitHub repo named `techsupercharge`, so that I can link it in the submission.

#### Acceptance Criteria
1. THE project SHALL be committed to a Git repository and pushed to a public GitHub repository named `techsupercharge`.
2. THE repository SHALL exclude generated/tooling artifacts not needed for the site (via `.gitignore`).
3. THE repository root SHALL contain the three site files and the resume PDF.
