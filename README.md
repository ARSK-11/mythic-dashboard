# Journey Audit

buatkan dashboard menggunakan motion dan shacdn denganstyle seperti ini 

<main class="app-shell" id="appShell">

  <header class="hero bento-card">

    <div class="hero-copy">

      <p class="eyebrow" id="eyebrow">Olympus Operations · Project Postmortem</p>

      <h1 id="mainTitle">

        Return to

        <span>Ithaca</span>

      </h1>

      <p class="hero-description" id="heroDescription">

        A routine trip home became a ten-year delivery delay involving monsters,

        divine interference, poor delegation, and one extremely manual automation.

      </p>

      <div class="hero-actions">

        <button class="primary-button" id="runAudit" type="button">

          <span>Run project audit</span>

          <span aria-hidden="true">↗</span>

        </button>

        <button class="secondary-button" id="dreamToggle" type="button" aria-pressed="false">

          Dream theory: OFF

        </button>

      </div>

    </div>

    <div class="hero-symbol" aria-hidden="true">

      <div class="sun-ring">

        <div class="ship">

          <span class="sail"></span>

          <span class="mast"></span>

          <span class="hull"></span>

        </div>

      </div>

      <p id="symbolLabel">Destination overdue</p>

    </div>

  </header>

  <section class="stats-grid" aria-label="Project statistics">

    <article class="stat-card bento-card stat-yellow">

      <p class="stat-label">Total absence</p>

      <strong>20</strong>

      <span>years away from Ithaca</span>

    </article>

    <article class="stat-card bento-card stat-blue">

      <p class="stat-label">Actual journey home</p>

      <strong>10</strong>

      <span>years of preventable detours</span>

    </article>

    <article class="stat-card bento-card stat-pink">

      <p class="stat-label">Longest blocker</p>

      <strong>7</strong>

      <span>years with Calypso</span>

    </article>

    <article class="stat-card bento-card stat-green">

      <p class="stat-label">Automation deployed</p>

      <strong>1</strong>

      <span>hero tied to a mast</span>

    </article>

  </section>

  <section class="audit-card bento-card">

    <div class="audit-heading">

      <div>

        <p class="eyebrow">Delivery health</p>

        <h2>Journey efficiency audit</h2>

      </div>

      <strong class="audit-grade" id="auditGrade">?</strong>

    </div>

    <div class="audit-meter" id="auditMeter" role="progressbar" aria-label="Audit progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">

      <span id="auditFill"></span>

    </div>

    <div class="audit-result">

      <p id="auditStatus">

        Audit not started. Heroic reputation is currently protecting the project

        lead from scrutiny.

      </p>

      <span id="auditPercent">0%</span>

    </div>

  </section>

  <section class="incident-section">

    <div class="section-heading">

      <div>

        <p class="eyebrow">Incident registry</p>

        <h2>Where the journey went wrong</h2>

      </div>

      <div class="filters" id="filters" aria-label="Incident filters">

        <button class="filter-button active" type="button" data-filter="all">

          All

        </button>

        <button class="filter-button" type="button" data-filter="distraction">

          Distractions

        </button>

        <button class="filter-button" type="button" data-filter="blocker">

          Blockers

        </button>

        <button class="filter-button" type="button" data-filter="failure">

          Team failures

        </button>

      </div>

    </div>

    <div class="workspace">

      <div class="incident-grid" id="incidentGrid"></div>

      <aside class="inspector bento-card" aria-live="polite">

        <div class="inspector-topline">

          <span class="severity-badge" id="detailSeverity">High severity</span>

          <span class="incident-number" id="detailNumber">Incident 01</span>

        </div>

        <p class="detail-category" id="detailCategory">Distraction</p>

        <h3 id="detailTitle">The Lotus-Eaters</h3>

        <div class="detail-block">

          <span>What happened</span>

          <p id="detailIssue">

            The crew encountered a pleasant environment and temporarily abandoned

            the primary objective.

          </p>

        </div>

        <div class="detail-block">

          <span>What should have been done</span>

          <p id="detailAction">

            Establish milestones, maintain crew accountability, and enforce a

            strict departure deadline.

          </p>

        </div>

        <div class="recommendation-box">

          <div>

            <span>Recommended system</span>

            <strong id="detailSystem">Automated deadline alerts</strong>

          </div>

          <span class="system-icon" id="detailIcon" aria-hidden="true">⏱</span>

        </div>

        <div class="inspector-actions">

          <button class="secondary-button dark-button" id="nextIncident" type="button">

            Next incident

          </button>

          <button class="text-button" id="copyReport" type="button">

            Copy postmortem

          </button>

        </div>

      </aside>

    </div>

  </section>

  <section class="remediation-grid">

    <article class="remediation-card bento-card">

      <span class="remediation-number">01</span>

      <p class="eyebrow">Delegate</p>

      <h3>Stop personally investigating every mysterious island.</h3>

      <p>

        Assign scouting, navigation, provisions, and risk assessment to qualified

        crew members.

      </p>

    </article>

    <article class="remediation-card bento-card">

      <span class="remediation-number">02</span>

      <p class="eyebrow">Automate</p>

      <h3>Replace mast-based workflows with repeatable systems.</h3>

      <p>

        Use alerts, access restrictions, documented procedures, and automatic

        escalation rules.

      </p>

    </article>

    <article class="remediation-card bento-card">

      <span class="remediation-number">03</span>

      <p class="eyebrow">Escalate</p>

      <h3>Do not wait seven years before reporting a blocker.</h3>

      <p>

        Contact Athena, Zeus, or another executive sponsor before the delay becomes

        an epic poem.

      </p>

    </article>

  </section>

  <footer class="footer bento-card">

    <div>

      <p class="eyebrow">Final assessment</p>

      <h2 id="finalAssessment">

        Legendary hero. Questionable project manager.

      </h2>

    </div>

    <p>

      Project: Return to Ithaca<br />

      Status: Eventually delivered

    </p>

  </footer>

  <div class="toast" id="toast" role="status" aria-live="polite">

    Postmortem copied.

  </div>

</main>

<!--A mythological project postmortem examining how Odysseus turned a journey home into a ten-year delivery delay. Review the distractions, blockers, communication failures, questionable delegation, and the ancient manual automation known as tying yourself to a mast.

Could better planning, access controls, deadlines, and divine escalation have brought him home sooner—or was the entire journey only a dream?-->



@import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap");

:root {
  --ink: #171717;
  --paper: #f4efe4;
  --white: #fffdf8;
  --yellow: #ffd84d;
  --blue: #8cbcff;
  --pink: #ff9fca;
  --green: #a9e76c;
  --purple: #b99cff;
  --orange: #ff9d57;
  --border: 3px solid var(--ink);
  --shadow: 7px 7px 0 var(--ink);
  --small-shadow: 4px 4px 0 var(--ink);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  margin: 0;
  color: var(--ink);
  background: radial-gradient(
      circle at 10% 15%,
      rgba(255, 216, 77, 0.35),
      transparent 25%
    ),
    radial-gradient(
      circle at 90% 12%,
      rgba(140, 188, 255, 0.35),
      transparent 27%
    ),
    var(--paper);
  font-family: "Space Grotesk", sans-serif;
  transition: background 400ms ease, color 400ms ease;
}

button {
  color: inherit;
  font: inherit;
}

button:focus-visible {
  outline: 4px solid var(--purple);
  outline-offset: 4px;
}

.app-shell {
  width: min(1440px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 60px;
}

.bento-card {
  border: var(--border);
  border-radius: 22px;
  background: var(--white);
  box-shadow: var(--shadow);
}

.eyebrow {
  margin: 0 0 10px;
  font-family: "DM Mono", monospace;
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.4;
  text-transform: uppercase;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.7fr);
  min-height: 510px;
  overflow: hidden;
}

.hero::before {
  position: absolute;
  right: 30%;
  bottom: -130px;
  width: 260px;
  height: 260px;
  border: var(--border);
  border-radius: 50%;
  background: var(--pink);
  content: "";
}

.hero-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
  padding: clamp(32px, 6vw, 80px);
}

.hero h1 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(3.4rem, 9vw, 8.5rem);
  font-weight: 700;
  letter-spacing: -0.075em;
  line-height: 0.82;
}

.hero h1 span {
  display: block;
  color: #d75d35;
  -webkit-text-stroke: 2px var(--ink);
  text-shadow: 4px 4px 0 var(--yellow);
}

.hero-description {
  max-width: 680px;
  margin: 30px 0 0;
  font-size: clamp(1rem, 1.7vw, 1.24rem);
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.primary-button,
.secondary-button,
.filter-button,
.text-button {
  cursor: pointer;
  border: var(--border);
  font-weight: 700;
  transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease;
}

.primary-button,
.secondary-button {
  min-height: 52px;
  padding: 0 20px;
  border-radius: 14px;
}

.primary-button {
  display: inline-flex;
  gap: 22px;
  align-items: center;
  justify-content: space-between;
  background: var(--yellow);
  box-shadow: var(--small-shadow);
}

.secondary-button {
  background: var(--white);
}

.primary-button:hover,
.secondary-button:hover,
.filter-button:hover,
.text-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 var(--ink);
}

.primary-button:active,
.secondary-button:active,
.filter-button:active,
.text-button:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--ink);
}

.primary-button:disabled {
  cursor: progress;
  opacity: 0.65;
}

.hero-symbol {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  padding: 34px;
  border-left: var(--border);
  background: var(--blue);
}

.hero-symbol p {
  position: absolute;
  right: 20px;
  bottom: 16px;
  left: 20px;
  margin: 0;
  font-family: "DM Mono", monospace;
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
}

.sun-ring {
  position: relative;
  display: grid;
  width: min(280px, 75%);
  aspect-ratio: 1;
  place-items: center;
  border: var(--border);
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    var(--yellow) 0deg 8deg,
    transparent 8deg 16deg
  );
  animation: rotate-sun 24s linear infinite;
}

.sun-ring::after {
  position: absolute;
  inset: 34px;
  border: var(--border);
  border-radius: 50%;
  background: var(--orange);
  content: "";
}

.ship {
  position: relative;
  z-index: 2;
  width: 130px;
  height: 120px;
  animation: counter-rotate 24s linear infinite;
}

.mast {
  position: absolute;
  top: 10px;
  left: 63px;
  width: 5px;
  height: 77px;
  border: 2px solid var(--ink);
  background: var(--ink);
}

.sail {
  position: absolute;
  top: 15px;
  left: 18px;
  width: 48px;
  height: 62px;
  border: var(--border);
  border-radius: 50% 8px 8px 50%;
  background: var(--white);
  transform: skewY(-8deg);
}

.hull {
  position: absolute;
  bottom: 18px;
  left: 10px;
  width: 112px;
  height: 34px;
  border: var(--border);
  border-radius: 4px 4px 55px 55px;
  background: var(--ink);
}

@keyframes rotate-sun {
  to {
    transform: rotate(360deg);
  }
}

@keyframes counter-rotate {
  to {
    transform: rotate(-360deg);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 26px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 220px;
  padding: 26px;
}

.stat-yellow {
  background: var(--yellow);
}

.stat-blue {
  background: var(--blue);
}

.stat-pink {
  background: var(--pink);
}

.stat-green {
  background: var(--green);
}

.stat-label {
  margin: 0;
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.stat-card strong {
  margin-top: auto;
  font-size: clamp(4rem, 7vw, 6.4rem);
  letter-spacing: -0.08em;
  line-height: 0.9;
}

.stat-card span {
  margin-top: 12px;
  font-weight: 600;
  line-height: 1.35;
}

.audit-card {
  margin-top: 26px;
  padding: clamp(26px, 5vw, 48px);
}

.audit-heading,
.audit-result,
.section-heading,
.inspector-topline,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
}

.audit-heading h2,
.section-heading h2,
.footer h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3.6rem);
  letter-spacing: -0.055em;
  line-height: 1;
}

.audit-grade {
  display: grid;
  flex: 0 0 auto;
  width: 90px;
  aspect-ratio: 1;
  place-items: center;
  border: var(--border);
  border-radius: 50%;
  background: var(--pink);
  box-shadow: var(--small-shadow);
  font-size: 2.4rem;
}

.audit-meter {
  height: 34px;
  margin-top: 32px;
  overflow: hidden;
  border: var(--border);
  border-radius: 999px;
  background: repeating-linear-gradient(
    -45deg,
    var(--paper) 0 12px,
    var(--white) 12px 24px
  );
}

.audit-meter span {
  display: block;
  width: 0;
  height: 100%;
  border-right: var(--border);
  background: var(--green);
  transition: width 120ms linear;
}

.audit-result {
  margin-top: 20px;
}

.audit-result p {
  max-width: 820px;
  margin: 0;
  line-height: 1.55;
}

.audit-result span {
  flex: 0 0 auto;
  font-family: "DM Mono", monospace;
  font-size: 1.2rem;
  font-weight: 700;
}

.incident-section {
  margin-top: 68px;
}

.section-heading {
  align-items: flex-end;
  margin-bottom: 24px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.filter-button {
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--white);
  box-shadow: 3px 3px 0 var(--ink);
  font-size: 0.82rem;
}

.filter-button.active {
  background: var(--yellow);
}

.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.75fr);
  gap: 26px;
  align-items: start;
}

.incident-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  min-width: 0;
}

.incident-card {
  position: relative;
  min-width: 0;
  min-height: 250px;
  padding: 24px;
  overflow: hidden;
  cursor: pointer;
  border: var(--border);
  border-radius: 20px;
  background: var(--white);
  box-shadow: var(--small-shadow);
  text-align: left;
  transition: transform 170ms ease, box-shadow 170ms ease, background 170ms ease;
}

.incident-card::after {
  position: absolute;
  right: -25px;
  bottom: -25px;
  width: 90px;
  height: 90px;
  border: var(--border);
  border-radius: 50%;
  background: var(--card-color, var(--yellow));
  content: "";
}

.incident-card:hover,
.incident-card.selected {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 var(--ink);
}

.incident-card.selected {
  background: var(--card-color, var(--yellow));
}

.incident-card-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.incident-index,
.incident-duration {
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.incident-card h3 {
  max-width: 85%;
  margin: 52px 0 12px;
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  letter-spacing: -0.045em;
  line-height: 1;
}

.incident-card p {
  max-width: 86%;
  margin: 0;
  line-height: 1.5;
}

.incident-card-hidden {
  display: none;
}

.inspector {
  position: sticky;
  top: 18px;
  min-width: 0;
  padding: 28px;
  background: var(--ink);
  color: var(--white);
}

.severity-badge {
  padding: 8px 11px;
  border: 2px solid var(--white);
  border-radius: 999px;
  background: var(--pink);
  color: var(--ink);
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.incident-number,
.detail-category {
  font-family: "DM Mono", monospace;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-category {
  margin: 44px 0 10px;
  color: var(--yellow);
}

.inspector h3 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 4rem);
  letter-spacing: -0.055em;
  line-height: 0.95;
}

.detail-block {
  margin-top: 32px;
}

.detail-block span,
.recommendation-box span {
  font-family: "DM Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-block p {
  margin: 9px 0 0;
  color: #dedbd3;
  line-height: 1.55;
}

.recommendation-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 32px;
  padding: 18px;
  border: 2px solid var(--white);
  border-radius: 16px;
  background: var(--purple);
  color: var(--ink);
}

.recommendation-box strong {
  display: block;
  margin-top: 6px;
  line-height: 1.3;
}

.system-icon {
  display: grid;
  flex: 0 0 auto;
  width: 50px;
  aspect-ratio: 1;
  place-items: center;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--white);
  font-size: 1.4rem;
}

.inspector-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.dark-button {
  border-color: var(--white);
  background: var(--yellow);
  color: var(--ink);
}

.text-button {
  padding: 0 4px;
  border-color: transparent;
  background: transparent;
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.text-button:hover {
  box-shadow: none;
}

.remediation-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 68px;
}

.remediation-card {
  position: relative;
  min-width: 0;
  min-height: 340px;
  padding: 30px;
  overflow: hidden;
}

.remediation-card:nth-child(1) {
  background: var(--blue);
}

.remediation-card:nth-child(2) {
  background: var(--yellow);
}

.remediation-card:nth-child(3) {
  background: var(--pink);
}

.remediation-number {
  position: absolute;
  top: 15px;
  right: 22px;
  color: rgba(23, 23, 23, 0.17);
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.08em;
}

.remediation-card h3 {
  margin: 90px 0 20px;
  font-size: clamp(1.7rem, 3.3vw, 3rem);
  letter-spacing: -0.05em;
  line-height: 1;
}

.remediation-card > p:last-child {
  margin: 0;
  line-height: 1.6;
}

.footer {
  margin-top: 26px;
  padding: clamp(28px, 5vw, 48px);
  background: var(--green);
}

.footer > p {
  margin: 0;
  font-family: "DM Mono", monospace;
  font-size: 0.78rem;
  line-height: 1.7;
  text-align: right;
  text-transform: uppercase;
}

.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 20;
  padding: 14px 18px;
  border: var(--border);
  border-radius: 12px;
  background: var(--yellow);
  box-shadow: var(--small-shadow);
  font-weight: 700;
  opacity: 0;
  pointer-events: none;
  transform: translateY(20px);
  transition: opacity 200ms ease, transform 200ms ease;
}

.toast.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Dream theory mode */

body.dream-mode {
  background: radial-gradient(
      circle at 20% 15%,
      rgba(185, 156, 255, 0.5),
      transparent 28%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 159, 202, 0.42),
      transparent 30%
    ),
    #221b35;
}

body.dream-mode .app-shell {
  filter: saturate(0.9);
}

body.dream-mode .hero {
  background: linear-gradient(
      rgba(255, 253, 248, 0.82),
      rgba(255, 253, 248, 0.82)
    ),
    repeating-linear-gradient(
      45deg,
      var(--purple) 0 18px,
      var(--pink) 18px 36px
    );
}

body.dream-mode .hero-symbol {
  background: var(--purple);
}

body.dream-mode .sun-ring {
  animation-duration: 8s;
}

body.dream-mode .incident-card {
  background: linear-gradient(
      rgba(255, 253, 248, 0.9),
      rgba(255, 253, 248, 0.9)
    ),
    repeating-linear-gradient(
      -45deg,
      var(--purple) 0 10px,
      var(--pink) 10px 20px
    );
}

body.dream-mode .footer {
  background: var(--purple);
}

@media (max-width: 1050px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-symbol {
    min-height: 330px;
    border-top: var(--border);
    border-left: 0;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .workspace {
    grid-template-columns: 1fr;
  }

  .inspector {
    position: relative;
    top: auto;
  }
}

@media (max-width: 760px) {
  .app-shell {
    width: min(100% - 22px, 1440px);
    padding-top: 14px;
  }

  .bento-card {
    border-radius: 17px;
    box-shadow: 5px 5px 0 var(--ink);
  }

  .hero {
    min-height: auto;
  }

  .hero-copy {
    padding: 32px 24px 40px;
  }

  .hero h1 {
    font-size: clamp(3.2rem, 18vw, 5.6rem);
  }

  .hero h1 span {
    -webkit-text-stroke-width: 1.5px;
  }

  .hero::before {
    display: none;
  }

  .hero-symbol {
    min-height: 280px;
  }

  .hero-actions,
  .hero-actions button {
    width: 100%;
  }

  .primary-button,
  .secondary-button {
    justify-content: center;
  }

  .stats-grid,
  .incident-grid,
  .remediation-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: 185px;
  }

  .audit-heading,
  .audit-result,
  .section-heading,
  .footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .audit-grade {
    width: 72px;
  }

  .section-heading {
    margin-bottom: 20px;
  }

  .filters {
    justify-content: flex-start;
  }

  .filter-button {
    font-size: 0.75rem;
  }

  .incident-card {
    min-height: 225px;
  }

  .incident-card h3 {
    margin-top: 40px;
  }

  .inspector {
    padding: 24px;
  }

  .footer > p {
    text-align: left;
  }

  .toast {
    right: 12px;
    bottom: 12px;
    left: 12px;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}



const incidents = [

  {

    id: 1,

    title: "The Lotus-Eaters",

    category: "distraction",

    categoryLabel: "Distraction",

    duration: "Several avoidable days",

    severity: "High severity",

    summary: "The team forgot the primary objective after encountering lotus.",

    issue:

      "The crew entered an environment designed to eliminate urgency and temporarily abandoned the journey home.",

    action:

      "Establish milestones, maintain crew accountability, and enforce a strict departure deadline before exploring.",

    system: "Automated deadline alerts",

    icon: "⏱",

    color: "#ffd84d"

  },

  {

    id: 2,

    title: "The Cyclops",

    category: "blocker",

    categoryLabel: "Risk-management failure",

    duration: "One cave incident",

    severity: "Critical severity",

    summary: "An unvetted cave became a hostage situation.",

    issue:

      "Odysseus entered an unknown location without conducting reconnaissance, preparing an exit strategy, or respecting obvious risk signals.",

    action:

      "Send a scouting team first, document the entrance, retain an escape route, and avoid announcing your legal name to the threat.",

    system: "Pre-entry risk checklist",

    icon: "⚠",

    color: "#ff9d57"

  },

  {

    id: 3,

    title: "The Bag of Winds",

    category: "failure",

    categoryLabel: "Communication failure",

    duration: "Destination nearly reached",

    severity: "Critical severity",

    summary: "The crew opened a critical asset because nobody explained it.",

    issue:

      "A sealed navigational resource was left beside an uninformed and suspicious crew with no ownership protocol.",

    action:

      "Identify the asset, explain its purpose, assign a trusted owner, and implement access controls before going to sleep.",

    system: "Role-based access control",

    icon: "🔐",

    color: "#8cbcff"

  },

  {

    id: 4,

    title: "Circe's Island",

    category: "distraction",

    categoryLabel: "Scope creep",

    duration: "Approximately one year",

    severity: "High severity",

    summary: "A rescue operation turned into a year-long residency.",

    issue:

      "After resolving the initial crisis, the project lead remained at a comfortable detour without a defined departure date.",

    action:

      "Close the incident, restore the team, record lessons learned, and immediately return to the original project roadmap.",

    system: "Calendar-based escalation",

    icon: "📆",

    color: "#ff9fca"

  },

  {

    id: 5,

    title: "The Sirens",

    category: "distraction",

    categoryLabel: "Known distraction",

    duration: "Brief but dramatic",

    severity: "Medium severity",

    summary: "A predictable temptation required a mast-based workaround.",

    issue:

      "Odysseus knew the distraction was dangerous but still designed a process that required the entire crew to restrain him manually.",

    action:

      "Block exposure completely, document the procedure, and remove the project lead as a single point of failure.",

    system: "Automated content restriction",

    icon: "🔇",

    color: "#b99cff"

  },

  {

    id: 6,

    title: "Scylla and Charybdis",

    category: "blocker",

    categoryLabel: "Forced trade-off",

    duration: "One catastrophic passage",

    severity: "Unavoidable severity",

    summary: "The route offered two bad options and no perfect outcome.",

    issue:

      "This was a genuine strategic constraint rather than a simple distraction. Every route involved measurable loss.",

    action:

      "Evaluate both risks, choose the least destructive option, communicate the decision, and document why the loss was accepted.",

    system: "Decision-impact matrix",

    icon: "⚖",

    color: "#a9e76c"

  },

  {

    id: 7,

    title: "Calypso",

    category: "blocker",

    categoryLabel: "Executive-level blocker",

    duration: "Seven years",

    severity: "Maximum severity",

    summary: "The project remained blocked for seven years before escalation.",

    issue:

      "Odysseus was unable to leave, yet the issue remained unresolved until divine leadership finally intervened.",

    action:

      "Escalate captivity to Athena immediately, request executive sponsorship, and do not allow a blocker to age into an epic subplot.",

    system: "Automatic blocker escalation",

    icon: "📣",

    color: "#ff9fca"

  }

];

const incidentGrid = document.querySelector("#incidentGrid");

const filterButtons = document.querySelectorAll(".filter-button");

const detailSeverity = document.querySelector("#detailSeverity");

const detailNumber = document.querySelector("#detailNumber");

const detailCategory = document.querySelector("#detailCategory");

const detailTitle = document.querySelector("#detailTitle");

const detailIssue = document.querySelector("#detailIssue");

const detailAction = document.querySelector("#detailAction");

const detailSystem = document.querySelector("#detailSystem");

const detailIcon = document.querySelector("#detailIcon");

const nextIncidentButton = document.querySelector("#nextIncident");

const dreamToggle = document.querySelector("#dreamToggle");

const runAuditButton = document.querySelector("#runAudit");

const copyReportButton = document.querySelector("#copyReport");

const auditFill = document.querySelector("#auditFill");

const auditMeter = document.querySelector("#auditMeter");

const auditStatus = document.querySelector("#auditStatus");

const auditPercent = document.querySelector("#auditPercent");

const auditGrade = document.querySelector("#auditGrade");

const eyebrow = document.querySelector("#eyebrow");

const mainTitle = document.querySelector("#mainTitle");

const heroDescription = document.querySelector("#heroDescription");

const symbolLabel = document.querySelector("#symbolLabel");

const finalAssessment = document.querySelector("#finalAssessment");

const toast = document.querySelector("#toast");

let selectedIncidentId = 1;

let currentFilter = "all";

let dreamMode = false;

let auditTimer = null;

let toastTimer = null;

function renderIncidentCards() {

  incidentGrid.innerHTML = incidents

    .map((incident) => {

      const hidden =

        currentFilter !== "all" && incident.category !== currentFilter;

      return `

        <button

          class="incident-card ${

            incident.id === selectedIncidentId ? "selected" : ""

          } ${hidden ? "incident-card-hidden" : ""}"

          type="button"

          data-id="${incident.id}"

          style="--card-color: ${incident.color}"

          aria-label="View ${incident.title} incident"

        >

          <div class="incident-card-top">

            <span class="incident-index">

              Incident ${String(incident.id).padStart(2, "0")}

            </span>

            <span class="incident-duration">${incident.duration}</span>

          </div>

          <h3>${incident.title}</h3>

          <p>${incident.summary}</p>

        </button>

      `;

    })

    .join("");

}

function selectIncident(id) {

  const incident = incidents.find((item) => item.id === id);

  if (!incident) {

    return;

  }

  selectedIncidentId = incident.id;

  detailSeverity.textContent = incident.severity;

  detailNumber.textContent = `Incident ${String(incident.id).padStart(2, "0")}`;

  detailCategory.textContent = incident.categoryLabel;

  detailTitle.textContent = incident.title;

  detailIssue.textContent = dreamMode

    ? `Possible dream symbol: ${incident.issue}`

    : incident.issue;

  detailAction.textContent = incident.action;

  detailSystem.textContent = incident.system;

  detailIcon.textContent = incident.icon;

  detailSeverity.style.background = incident.color;

  renderIncidentCards();

}

function getVisibleIncidents() {

  return incidents.filter(

    (incident) => currentFilter === "all" || incident.category === currentFilter

  );

}

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("visible");

  window.clearTimeout(toastTimer);

  toastTimer = window.setTimeout(() => {

    toast.classList.remove("visible");

  }, 2200);

}

incidentGrid.addEventListener("click", (event) => {

  const card = event.target.closest(".incident-card");

  if (!card) {

    return;

  }

  selectIncident(Number(card.dataset.id));

});

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;

    filterButtons.forEach((item) => {

      item.classList.toggle("active", item === button);

    });

    const visibleIncidents = getVisibleIncidents();

    if (

      visibleIncidents.length &&

      !visibleIncidents.some((incident) => incident.id === selectedIncidentId)

    ) {

      selectedIncidentId = visibleIncidents[0].id;

      selectIncident(selectedIncidentId);

    } else {

      renderIncidentCards();

    }

  });

});

nextIncidentButton.addEventListener("click", () => {

  const visibleIncidents = getVisibleIncidents();

  if (!visibleIncidents.length) {

    return;

  }

  const currentIndex = visibleIncidents.findIndex(

    (incident) => incident.id === selectedIncidentId

  );

  const nextIndex =

    currentIndex === -1 ? 0 : (currentIndex + 1) % visibleIncidents.length;

  selectIncident(visibleIncidents[nextIndex].id);

});

dreamToggle.addEventListener("click", () => {

  dreamMode = !dreamMode;

  document.body.classList.toggle("dream-mode", dreamMode);

  dreamToggle.setAttribute("aria-pressed", String(dreamMode));

  dreamToggle.textContent = `Dream theory: ${dreamMode ? "ON" : "OFF"}`;

  if (dreamMode) {

    eyebrow.textContent = "Unreliable Narrative Mode · Dream Hypothesis";

    mainTitle.innerHTML = `Was Ithaca <span>Ever Real?</span>`;

    heroDescription.textContent =

      "Perhaps the monsters, goddesses, storms, and ten-year detour were not project failures at all—but symbols inside one extremely elaborate dream.";

    symbolLabel.textContent = "Reality status unknown";

    finalAssessment.textContent =

      "Legendary hero. Possibly unconscious project manager.";

  } else {

    eyebrow.textContent = "Olympus Operations · Project Postmortem";

    mainTitle.innerHTML = `Return to <span>Ithaca</span>`;

    heroDescription.textContent =

      "A routine trip home became a ten-year delivery delay involving monsters, divine interference, poor delegation, and one extremely manual automation.";

    symbolLabel.textContent = "Destination overdue";

    finalAssessment.textContent =

      "Legendary hero. Questionable project manager.";

  }

  selectIncident(selectedIncidentId);

});

runAuditButton.addEventListener("click", () => {

  window.clearInterval(auditTimer);

  let progress = 0;

  runAuditButton.disabled = true;

  runAuditButton.querySelector("span:first-child").textContent =

    "Auditing mythology…";

  auditGrade.textContent = "…";

  auditStatus.textContent =

    "Reviewing detours, blockers, crew permissions, divine dependencies, and mast-based automation.";

  auditFill.style.width = "0%";

  auditPercent.textContent = "0%";

  auditMeter.setAttribute("aria-valuenow", "0");

  auditTimer = window.setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 3;

    if (progress >= 100) {

      progress = 100;

      window.clearInterval(auditTimer);

      auditGrade.textContent = "D−";

      auditStatus.textContent =

        "Audit complete: approximately 86% of the journey delay could have been reduced through delegation, access control, deadlines, and earlier escalation.";

      runAuditButton.disabled = false;

      runAuditButton.querySelector("span:first-child").textContent =

        "Run audit again";

      showToast("Audit complete. The gods have been notified.");

    }

    auditFill.style.width = `${progress}%`;

    auditPercent.textContent = `${progress}%`;

    auditMeter.setAttribute("aria-valuenow", String(progress));

  }, 90);

});

copyReportButton.addEventListener("click", async () => {

  const incident = incidents.find((item) => item.id === selectedIncidentId);

  if (!incident) {

    return;

  }

  const report = [

    "ODYSSEUS PROJECT POSTMORTEM",

    "",

    `Incident: ${incident.title}`,

    `Category: ${incident.categoryLabel}`,

    `Duration: ${incident.duration}`,

    "",

    `What happened: ${incident.issue}`,

    "",

    `Recommended response: ${incident.action}`,

    "",

    `System required: ${incident.system}`,

    "",

    "Final assessment: Legendary hero. Questionable project manager."

  ].join("\n");

  try {

    await navigator.clipboard.writeText(report);

    showToast("Postmortem copied.");

  } catch (error) {

    const temporaryTextArea = document.createElement("textarea");

    temporaryTextArea.value = report;

    temporaryTextArea.setAttribute("readonly", "");

    temporaryTextArea.style.position = "fixed";

    temporaryTextArea.style.opacity = "0";

    document.body.appendChild(temporaryTextArea);

    temporaryTextArea.select();

    document.execCommand("copy");

    temporaryTextArea.remove();

    showToast("Postmortem copied.");

  }

});

renderIncidentCards();

selectIncident(selectedIncidentId);

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9f119b9e-7433-45ea-bd99-9f55e38dc08e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
