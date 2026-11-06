/* ============================================================
   Santhosh P — Portfolio interactions + supershell terminal
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Shared content (single source of truth) ---------- */
  const CONTENT = {
    about:
      "Santhosh P — B.E. Computer Science Engineering @ Karpagam Institute of Technology (CGPA 8.72), Coimbatore, India.\n" +
      "I build explainable agentic AI, multimodal ML systems, and cloud/DevOps tooling — turning research-grade ideas\n" +
      "into containerized, observable, production-shaped systems. Cloud club Technical Lead and competitive-programming grinder.",
    skills: {
      Languages: ["Python", "C++", "Java", "SQL", "Rust", "R"],
      "AI/ML": ["Hugging Face Transformers", "Ollama", "vLLM", "MLflow", "LangChain", "LangGraph"],
      Databases: ["PostgreSQL", "Qdrant", "pgvector", "MongoDB"],
      Frameworks: ["FastAPI", "React", "Next.js", "Node.js"],
      "DevOps & Tools": ["Docker", "Podman", "GitHub Actions", "Git", "Linux", "Dozzle", "Beszel"],
      "Cloud & Data": ["AWS", "Excel (large-scale analysis)", "Matplotlib", "D2", "Mermaid"],
    },
    projects: [
      {
        name: "Deepfake-Agentic-AI",
        period: "Nov 2025 – Jun 2026",
        stack: "Python · FastAPI · Docker · LangChain · LangGraph · PostgreSQL",
        bullets: [
          "Explainable agentic deepfake-detection pipeline (OpenCV, custom CNNs, ViTs) — 94% accuracy on a self-labeled test set.",
          "LLM reasoning layer (Gemma + LLaMA) generating human-readable explanations for every detection.",
          "Containerized microservices with safety guardrails, real-time observability, and 40+ automated test suites in CI/CD.",
        ],
      },
      {
        name: "Multimodal RAG Assistant",
        period: "Apr 2026 – Sept 2026",
        stack: "Python · FastAPI · LangGraph · Next.js · MCP",
        bullets: [
          "Multimodal RAG (SigLIP + all-MiniLM-L6-v2, adaptive chunking, hybrid search) — 98% retrieval accuracy.",
          "Dot-product similarity on L2-normalized embeddings to kill redundant ops at scale.",
          "5-layer cache + perceptual hashing; shipped as a local MCP server for Claude Desktop, validated across 42 suites.",
        ],
      },
      {
        name: "doc2site",
        period: "Dec 2025 – Jan 2026",
        stack: "JavaScript · GitHub Actions · Static Site Generation",
        bullets: [
          "Markdown docs → live, custom-styled sites from a single repo push. No manual hosting setup.",
          "Powers 15+ live documentation sites, fully driven by GitHub Actions with custom CSS theming.",
        ],
      },
    ],
    achievements: [
      "CloudWeld (Cloud Club): Member → Technical Lead, driving cloud-focused technical sessions.",
      "UG Madurai: #1 on the college-club leaderboard for 2+ months; organized AWSBlocks (72 participants).",
      "Techtronautz (Dept. Club): co-organized 7–8 events, building leadership & public-speaking.",
      "500+ LeetCode, 200+ CodeChef, 25+ contests; registered for ICPC 2026–27.",
      "Led teams across 50+ hackathons; Top 10 on the UG Builder Circle leaderboard.",
    ],
    contact: {
      email: "santhosh11042007@gmail.com",
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/",
      location: "Coimbatore, Tamil Nadu, India",
    },
    resume: "santhosh%20p.pdf",
    motto: "\"Ship explainable systems, not black boxes.\"",
  };

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const open = primaryNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    primaryNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        primaryNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Active-link highlighting ---------- */
  const sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.primary-nav a[href^="#"]'));
  const linkFor = {};
  navLinks.forEach(function (l) { linkFor[l.getAttribute("href").slice(1)] = l; });

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("active"); });
            const link = linkFor[e.target.id];
            if (link) link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ============================================================
     SUPERSHELL TERMINAL
     ============================================================ */
  const term = document.getElementById("supershell");
  const output = document.getElementById("term-output");
  const form = document.getElementById("term-form");
  const input = document.getElementById("term-input");
  const openBtns = [document.getElementById("open-terminal"), document.getElementById("open-terminal-footer")];
  const closeBtn = document.getElementById("close-terminal");

  let lastFocused = null;
  const history = [];
  let histIndex = -1;
  let booted = false;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function printLine(html, cls) {
    const div = document.createElement("div");
    div.className = "line" + (cls ? " " + cls : "");
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function printBlock(text, cls) {
    String(text).split("\n").forEach(function (ln) { printLine(esc(ln) || "&nbsp;", cls || "out"); });
  }

  function echo(cmd) {
    printLine('<span class="prompt-mini">santhosh@portfolio:~$</span> ' + esc(cmd), "echo");
  }

  /* ---------- Command handlers ---------- */
  const COMMANDS = {
    help: function () {
      printLine("Available commands:", "heading");
      const rows = [
        ["about", "who I am"],
        ["skills", "the tech superpowers"],
        ["projects", "what I've built ( try: projects deepfake )"],
        ["achievements", "leadership & competitive programming"],
        ["contact", "how to reach me"],
        ["resume", "download the résumé"],
        ["clear", "wipe the screen"],
        ["exit", "close supershell"],
      ];
      rows.forEach(function (r) {
        printLine("  <span class='ok'>" + r[0].padEnd(14) + "</span><span class='out'>" + esc(r[1]) + "</span>");
      });
      printLine("  <span class='out'>…and a few hidden commands. Try <span class='accent'>whoami</span>, <span class='accent'>motto</span>, <span class='accent'>sudo</span>, or <span class='accent'>banner</span>.</span>");
    },

    about: function () { printBlock(CONTENT.about); },

    skills: function (args) {
      const groups = CONTENT.skills;
      if (args[0]) {
        const key = Object.keys(groups).find(function (k) { return k.toLowerCase().indexOf(args[0].toLowerCase()) !== -1; });
        if (key) { printLine(key + ":", "heading"); printLine("  " + esc(groups[key].join(", ")), "out"); return; }
      }
      Object.keys(groups).forEach(function (k) {
        printLine(k + ":", "accent");
        printLine("  " + esc(groups[k].join(", ")), "out");
      });
    },

    projects: function (args) {
      const list = CONTENT.projects;
      if (args[0]) {
        const p = list.find(function (x) { return x.name.toLowerCase().indexOf(args[0].toLowerCase()) !== -1; });
        if (!p) { printLine("No project matches '" + esc(args[0]) + "'. Try: projects", "err"); return; }
        printLine(p.name + "  (" + p.period + ")", "heading");
        printLine(esc(p.stack), "accent");
        p.bullets.forEach(function (b) { printLine("  • " + esc(b), "out"); });
        return;
      }
      list.forEach(function (p) {
        printLine(p.name + "  " + "<span class='out'>(" + esc(p.period) + ")</span>", "ok");
        printLine("  " + esc(p.stack), "accent");
        printLine("  " + esc(p.bullets[0]), "out");
      });
      printLine("Tip: <span class='accent'>projects &lt;name&gt;</span> for full details.", "out");
    },

    achievements: function () {
      CONTENT.achievements.forEach(function (a) { printLine("  ★ " + esc(a), "out"); });
    },

    contact: function () {
      const c = CONTENT.contact;
      printLine("email    <a href='mailto:" + c.email + "'>" + c.email + "</a>");
      printLine("linkedin <a href='" + c.linkedin + "' target='_blank' rel='noopener'>" + c.linkedin + "</a>");
      printLine("github   <a href='" + c.github + "' target='_blank' rel='noopener'>" + c.github + "</a>");
      printLine("location " + esc(c.location), "out");
    },

    resume: function () {
      printLine("Opening résumé… <a href='" + CONTENT.resume + "' download>download santhosh-p.pdf</a>", "ok");
      window.open(CONTENT.resume, "_blank");
    },

    clear: function () { output.innerHTML = ""; },

    exit: function () { closeTerminal(); },

    /* ---------- easter eggs ---------- */
    whoami: function () {
      printLine("santhosh", "ok");
      printLine("Fun fact: I'd rather debug a Docker network at 2am than scroll a feed. " +
        "I ranked #1 on the UG Madurai leaderboard for 2+ months and have cleared 500+ LeetCode problems.", "out");
    },
    motto: function () { printLine(CONTENT.motto, "accent"); },
    sudo: function (args) {
      printLine("santhosh is not in the sudoers file. This incident will be reported. 😏", "warnline");
      if (args.join(" ").indexOf("hire") !== -1) printLine("…but I accept internship offers. Try: contact", "ok");
    },
    banner: function () {
      [
        "  ____              _   _               _     ",
        " / ___|  __ _ _ __ | |_| |__   ___  ___| |__  ",
        " \\___ \\ / _` | '_ \\| __| '_ \\ / _ \\/ __| '_ \\ ",
        "  ___) | (_| | | | | |_| | | | (_) \\__ \\ | | |",
        " |____/ \\__,_|_| |_|\\__|_| |_|\\___/|___/_| |_|",
      ].forEach(function (l) { printLine(esc(l), "accent"); });
      printLine("agentic AI · ML systems · cloud & DevOps", "out");
    },
  };
  // aliases
  COMMANDS.ls = COMMANDS.help;
  COMMANDS.me = COMMANDS.about;
  COMMANDS.cv = COMMANDS.resume;

  function runCommand(raw) {
    const line = raw.trim();
    echo(line);
    if (!line) return;
    const parts = line.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const fn = COMMANDS[cmd];
    if (fn) {
      try { fn(args); }
      catch (err) { printLine("error: command crashed (" + esc(err && err.message) + ")", "err"); }
    } else {
      printLine("command not found: " + esc(cmd) + " — type <span class='accent'>help</span> to see what's available.", "err");
    }
  }

  function boot() {
    if (booted) return;
    booted = true;
    printLine("supershell v1.0 — Santhosh P's interactive portfolio terminal", "ok");
    printLine("Type <span class='accent'>help</span> to get started. Use ↑ / ↓ for history, <span class='accent'>exit</span> or Esc to close.", "out");
    printLine("&nbsp;");
  }

  /* ---------- open / close ---------- */
  function openTerminal() {
    if (!term) return;
    lastFocused = document.activeElement;
    term.hidden = false;
    boot();
    setTimeout(function () { input && input.focus(); }, 20);
  }
  function closeTerminal() {
    if (!term) return;
    term.hidden = true;
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  openBtns.forEach(function (b) { if (b) b.addEventListener("click", openTerminal); });
  if (closeBtn) closeBtn.addEventListener("click", closeTerminal);

  // backdrop click closes
  if (term) {
    term.addEventListener("mousedown", function (e) { if (e.target === term) closeTerminal(); });
  }

  // submit
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const val = input.value;
      if (val.trim()) { history.push(val); histIndex = history.length; }
      runCommand(val);
      input.value = "";
    });
  }

  // history + input-scoped keys
  if (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length && histIndex > 0) { histIndex--; input.value = history[histIndex]; }
        else if (history.length && histIndex === -1) { histIndex = history.length - 1; input.value = history[histIndex]; }
        moveCaretEnd(input);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIndex < history.length - 1) { histIndex++; input.value = history[histIndex]; }
        else { histIndex = history.length; input.value = ""; }
      }
    });
  }

  function moveCaretEnd(el) {
    setTimeout(function () { const n = el.value.length; try { el.setSelectionRange(n, n); } catch (e) {} }, 0);
  }

  /* ---------- global keys ---------- */
  document.addEventListener("keydown", function (e) {
    const typing = /^(input|textarea|select)$/i.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable);
    // backtick opens (when not typing in a field and terminal closed)
    if (e.key === "`" && term && term.hidden && !typing) {
      e.preventDefault();
      openTerminal();
    } else if (e.key === "Escape" && term && !term.hidden) {
      closeTerminal();
    }
  });
})();
