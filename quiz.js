(function () {

  // ── QUIZ DATA ───────────────────────────────────────────────────
  const QUESTIONS = [
    {
      q: "How often do you currently use AI tools in your work?",
      answers: [
        { text: "I haven't started yet — still figuring out where to begin.", score: 1 },
        { text: "I've tried a few things here and there but nothing consistent.", score: 2 },
        { text: "I use AI tools most days for specific tasks.", score: 3 },
        { text: "AI is embedded in how I work — I'd notice immediately if it disappeared.", score: 4 },
      ]
    },
    {
      q: "When you use AI, how do you typically interact with it?",
      answers: [
        { text: "I type basic questions and take whatever comes back.", score: 1 },
        { text: "I've started learning to write better prompts and refine outputs.", score: 2 },
        { text: "I use structured prompts and iterate until I get exactly what I need.", score: 3 },
        { text: "I use multi-step prompting, custom instructions, and system-level configurations.", score: 4 },
      ]
    },
    {
      q: "How much of your actual workflow has AI changed?",
      answers: [
        { text: "Nothing has changed yet — I'm still working exactly as I was before.", score: 1 },
        { text: "A task or two here and there, but my core process is the same.", score: 2 },
        { text: "Several parts of my workflow are meaningfully faster or better.", score: 3 },
        { text: "AI has fundamentally restructured how I approach my work.", score: 4 },
      ]
    },
    {
      q: "How does your team or organization feel about AI right now?",
      answers: [
        { text: "There's no shared direction — people are on their own or avoiding it entirely.", score: 1 },
        { text: "There's awareness and some interest, but no consistent approach or policy.", score: 2 },
        { text: "We have some shared practices and people are actively building habits.", score: 3 },
        { text: "AI is embedded in team workflows with governance, shared tools, and clear norms.", score: 4 },
      ]
    },
    {
      q: "When an AI output isn't quite right, what do you do?",
      answers: [
        { text: "I usually accept it or give up — I'm not sure how to improve it.", score: 1 },
        { text: "I rewrite the prompt a couple of times and see what happens.", score: 2 },
        { text: "I have a clear process for diagnosing what went wrong and fixing it.", score: 3 },
        { text: "I debug outputs systematically and adjust my frameworks accordingly.", score: 4 },
      ]
    },
    {
      q: "Have you connected AI tools to other systems or automated any workflows?",
      answers: [
        { text: "No — I'm still using AI as a standalone tool for manual tasks.", score: 1 },
        { text: "I've thought about it but haven't set anything up yet.", score: 2 },
        { text: "I have a few integrations or semi-automated steps in place.", score: 3 },
        { text: "I've built automated pipelines where AI handles multi-step processes without me.", score: 4 },
      ]
    },
    {
      q: "How do you handle sensitive information and AI governance at work?",
      answers: [
        { text: "I haven't thought about governance yet — I'm just experimenting.", score: 1 },
        { text: "I'm cautious but don't have a formal policy or clear guardrails.", score: 2 },
        { text: "I follow a personal or team framework for what goes in and what doesn't.", score: 3 },
        { text: "We have documented policies, compliance checks, and ongoing governance reviews.", score: 4 },
      ]
    },
    {
      q: "When you learn something new about AI, what do you do with it?",
      answers: [
        { text: "I might read about it but rarely apply it to my work.", score: 1 },
        { text: "I try it out occasionally when something seems directly relevant.", score: 2 },
        { text: "I actively experiment and build new capabilities into how I work.", score: 3 },
        { text: "I evaluate, implement, and teach new approaches to others quickly.", score: 4 },
      ]
    },
    {
      q: "How clearly can you explain what AI does and doesn't do well in your specific role?",
      answers: [
        { text: "I'm still figuring out what AI can actually do for someone in my position.", score: 1 },
        { text: "I have a general sense but couldn't give a precise answer.", score: 2 },
        { text: "I can clearly explain where AI helps me and where human judgment is still required.", score: 3 },
        { text: "I can map AI capabilities to specific decisions, tasks, and risks in my role in detail.", score: 4 },
      ]
    },
    {
      q: "What best describes your AI goal for the next 90 days?",
      answers: [
        { text: "I need to understand the basics and figure out where to even start.", score: 1 },
        { text: "I want to build consistent habits and stop starting over every time.", score: 2 },
        { text: "I want to accelerate — deeper integration, more automation, less manual work.", score: 3 },
        { text: "I want to architect systems, lead others, and stay ahead of what's coming.", score: 4 },
      ]
    },
  ];

  const RESULTS = {
    crawl: {
      label: "Crawl",
      emoji: "🌱",
      headline: "You're at the starting line — and that's exactly the right place to be honest about.",
      summary: "You have awareness and curiosity, which is more than most people start with. What you need now is a structured foundation: the right first tools, the right first habits, and someone to help you skip the trial-and-error phase entirely.",
      program: "The Clarity Session",
      programUrl: "/ai-enablement/individual-programs.html#clarity-session",
      cta: "Start with The Clarity Session",
      color: "#5F8C5F",
    },
    walk: {
      label: "Walk",
      emoji: "🚶",
      headline: "You're using AI — but inconsistently. The gap between where you are and where you could be is closer than you think.",
      summary: "You've got real experience but scattered habits. The missing piece is structure: a consistent approach, a personal prompt system, and a clear map of where AI belongs in your workflow versus where it doesn't.",
      program: "The Clarity Session or The Spark Solo",
      programUrl: "/spark-solo",
      cta: "See your program options",
      color: "#7A9E3B",
    },
    run: {
      label: "Run",
      emoji: "🏃",
      headline: "You're genuinely good at this. Now let's build something that scales.",
      summary: "You have solid habits and real capability. The opportunity now is to go deeper — automations, integrations, systems that reduce the human in the loop and let you operate at a higher level. You're ready for intensive work.",
      program: "The Spark Solo",
      programUrl: "/spark-solo",
      cta: "Explore The Spark Solo",
      color: "#B8860B",
    },
    fly: {
      label: "Fly",
      emoji: "🚀",
      headline: "You're operating at the edge of what most people know is possible.",
      summary: "You're not just using AI — you're orchestrating it. The next frontier is architecture: designing systems, leading organizational capability, and building the kind of AI-native practice that becomes a competitive advantage.",
      program: "The Executive AI Intensive or Deep AI Transformation",
      programUrl: "/ai-enablement/executive-intensive.html",
      cta: "See executive-level programs",
      color: "#1F3B1F",
    },
  };

  // ── BUILD WIDGET ────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #cwrf-trigger {
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: #1F3B1F;
      color: #fff;
      border: none;
      border-radius: 50px;
      padding: 13px 22px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      z-index: 9998;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.22);
      transition: transform 0.15s, background 0.15s;
    }
    #cwrf-trigger:hover { background: #2D5A2D; transform: translateY(-2px); }
    #cwrf-trigger .trigger-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #B8860B; flex-shrink: 0;
    }
    #cwrf-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    #cwrf-overlay.open { display: flex; }
    #cwrf-modal {
      background: #fff;
      border-radius: 16px;
      width: 100%;
      max-width: 580px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      font-family: inherit;
    }
    #cwrf-modal * { box-sizing: border-box; }
    .cwrf-header {
      padding: 28px 28px 0;
      border-bottom: 1px solid #e8f0e8;
      padding-bottom: 16px;
      margin-bottom: 0;
    }
    .cwrf-header-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 12px;
    }
    .cwrf-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1F3B1F;
      margin: 0;
      line-height: 1.3;
    }
    .cwrf-subtitle {
      font-size: 0.78rem;
      color: #888;
      margin: 3px 0 0;
    }
    .cwrf-close {
      background: none;
      border: 1px solid #ddd;
      border-radius: 6px;
      width: 28px;
      height: 28px;
      cursor: pointer;
      font-size: 14px;
      color: #888;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .cwrf-close:hover { background: #f5f5f5; }
    .cwrf-progress-bar {
      height: 4px;
      background: #e8f0e8;
      border-radius: 2px;
      overflow: hidden;
    }
    .cwrf-progress-fill {
      height: 100%;
      background: #1F3B1F;
      border-radius: 2px;
      transition: width 0.35s ease;
    }
    .cwrf-progress-text {
      font-size: 0.72rem;
      color: #888;
      margin-top: 6px;
      text-align: right;
    }
    .cwrf-body { padding: 24px 28px 28px; }
    .cwrf-question {
      font-size: 1.05rem;
      font-weight: 600;
      color: #1F3B1F;
      margin-bottom: 18px;
      line-height: 1.45;
    }
    .cwrf-answers { display: flex; flex-direction: column; gap: 8px; }
    .cwrf-answer {
      background: #f9fbf9;
      border: 1.5px solid #d4e4d4;
      border-radius: 10px;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 0.88rem;
      color: #333;
      line-height: 1.45;
      transition: all 0.15s;
      text-align: left;
      font-family: inherit;
      width: 100%;
    }
    .cwrf-answer:hover { border-color: #5F8C5F; background: #f0f7f0; }
    .cwrf-answer.selected { border-color: #1F3B1F; background: #e8f2e8; color: #1F3B1F; font-weight: 500; }
    .cwrf-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      gap: 10px;
    }
    .cwrf-btn {
      border-radius: 8px;
      padding: 10px 22px;
      font-size: 0.84rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.15s;
      border: none;
    }
    .cwrf-btn-back {
      background: none;
      border: 1.5px solid #ddd;
      color: #888;
    }
    .cwrf-btn-back:hover { border-color: #aaa; color: #555; }
    .cwrf-btn-next {
      background: #1F3B1F;
      color: #fff;
      margin-left: auto;
    }
    .cwrf-btn-next:disabled { background: #ccc; cursor: not-allowed; }
    .cwrf-btn-next:not(:disabled):hover { background: #2D5A2D; }
    .cwrf-result { text-align: center; padding: 8px 0 4px; }
    .cwrf-result-emoji { font-size: 3rem; margin-bottom: 8px; }
    .cwrf-result-badge {
      display: inline-block;
      padding: 4px 16px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 14px;
      color: #fff;
    }
    .cwrf-result-headline {
      font-size: 1rem;
      font-weight: 700;
      color: #1F3B1F;
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .cwrf-result-summary {
      font-size: 0.88rem;
      color: #555;
      line-height: 1.65;
      margin-bottom: 20px;
    }
    .cwrf-result-program {
      background: #f5fbf5;
      border: 1.5px solid #b8d8b8;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 18px;
      text-align: left;
    }
    .cwrf-result-program-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #5F8C5F;
      margin-bottom: 4px;
    }
    .cwrf-result-program-name {
      font-size: 1rem;
      font-weight: 700;
      color: #1F3B1F;
    }
    .cwrf-cta {
      display: block;
      width: 100%;
      background: #1F3B1F;
      color: #fff;
      text-align: center;
      padding: 13px 20px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.15s;
    }
    .cwrf-cta:hover { background: #2D5A2D; }
    .cwrf-restart {
      margin-top: 10px;
      background: none;
      border: none;
      color: #888;
      font-size: 0.78rem;
      cursor: pointer;
      font-family: inherit;
      width: 100%;
      text-align: center;
      padding: 6px;
    }
    .cwrf-restart:hover { color: #555; }
    @media (max-width: 480px) {
      #cwrf-trigger { bottom: 16px; right: 16px; padding: 11px 16px; font-size: 0.75rem; }
      #cwrf-modal { border-radius: 12px; }
      .cwrf-header, .cwrf-body { padding-left: 18px; padding-right: 18px; }
    }
  `;
  document.head.appendChild(style);

  // trigger button
  const trigger = document.createElement('button');
  trigger.id = 'cwrf-trigger';
  trigger.innerHTML = '<span class="trigger-dot"></span>Where do you stand with AI?';
  document.body.appendChild(trigger);

  // overlay + modal
  const overlay = document.createElement('div');
  overlay.id = 'cwrf-overlay';
  overlay.innerHTML = `
    <div id="cwrf-modal">
      <div class="cwrf-header">
        <div class="cwrf-header-top">
          <div>
            <p class="cwrf-title">AI Fluency Assessment</p>
            <p class="cwrf-subtitle">Crawl · Walk · Run · Fly &nbsp;·&nbsp; 10 questions · ~3 minutes</p>
          </div>
          <button class="cwrf-close" id="cwrf-close">✕</button>
        </div>
        <div class="cwrf-progress-bar"><div class="cwrf-progress-fill" id="cwrf-progress" style="width:0%"></div></div>
        <p class="cwrf-progress-text" id="cwrf-progress-text">Question 1 of 10</p>
      </div>
      <div class="cwrf-body" id="cwrf-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  // ── STATE ───────────────────────────────────────────────────────
  let current = 0;
  let answers = new Array(QUESTIONS.length).fill(null);

  function getResult(total) {
    if (total <= 17) return RESULTS.crawl;
    if (total <= 25) return RESULTS.walk;
    if (total <= 33) return RESULTS.run;
    return RESULTS.fly;
  }

  function renderQuestion() {
    const q = QUESTIONS[current];
    const pct = (current / QUESTIONS.length) * 100;
    document.getElementById('cwrf-progress').style.width = pct + '%';
    document.getElementById('cwrf-progress-text').textContent = `Question ${current + 1} of ${QUESTIONS.length}`;

    const body = document.getElementById('cwrf-body');
    const selected = answers[current];
    body.innerHTML = `
      <p class="cwrf-question">${q.q}</p>
      <div class="cwrf-answers">
        ${q.answers.map((a, i) => `
          <button class="cwrf-answer${selected === i ? ' selected' : ''}" data-idx="${i}">
            ${a.text}
          </button>`).join('')}
      </div>
      <div class="cwrf-nav">
        ${current > 0 ? '<button class="cwrf-btn cwrf-btn-back" id="cwrf-back">← Back</button>' : '<span></span>'}
        <button class="cwrf-btn cwrf-btn-next" id="cwrf-next" ${selected === null ? 'disabled' : ''}>
          ${current < QUESTIONS.length - 1 ? 'Next →' : 'See my results →'}
        </button>
      </div>`;

    body.querySelectorAll('.cwrf-answer').forEach(btn => {
      btn.addEventListener('click', function () {
        answers[current] = parseInt(this.dataset.idx);
        body.querySelectorAll('.cwrf-answer').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('cwrf-next').disabled = false;
      });
    });

    document.getElementById('cwrf-next').addEventListener('click', () => {
      if (current < QUESTIONS.length - 1) { current++; renderQuestion(); }
      else renderResult();
    });

    const backBtn = document.getElementById('cwrf-back');
    if (backBtn) backBtn.addEventListener('click', () => { current--; renderQuestion(); });
  }

  function renderResult() {
    const total = answers.reduce((sum, ai, qi) => sum + (ai !== null ? QUESTIONS[qi].answers[ai].score : 0), 0);
    const result = getResult(total);

    document.getElementById('cwrf-progress').style.width = '100%';
    document.getElementById('cwrf-progress-text').textContent = 'Assessment complete';

    document.getElementById('cwrf-body').innerHTML = `
      <div class="cwrf-result">
        <div class="cwrf-result-emoji">${result.emoji}</div>
        <span class="cwrf-result-badge" style="background:${result.color}">${result.label}</span>
        <p class="cwrf-result-headline">${result.headline}</p>
        <p class="cwrf-result-summary">${result.summary}</p>
        <div class="cwrf-result-program">
          <p class="cwrf-result-program-label">Recommended program</p>
          <p class="cwrf-result-program-name">${result.program}</p>
        </div>
        <a href="${result.programUrl}" class="cwrf-cta">${result.cta}</a>
        <button class="cwrf-restart" id="cwrf-restart">Start over</button>
      </div>`;

    document.getElementById('cwrf-restart').addEventListener('click', () => {
      current = 0;
      answers = new Array(QUESTIONS.length).fill(null);
      renderQuestion();
    });
  }

  // ── EVENTS ──────────────────────────────────────────────────────
  trigger.addEventListener('click', () => {
    overlay.classList.add('open');
    current = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    renderQuestion();
  });

  document.getElementById('cwrf-close').addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

}());
