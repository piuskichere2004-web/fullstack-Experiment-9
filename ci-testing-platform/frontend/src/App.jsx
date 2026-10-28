
import { useState } from "react";
import "./App.css";

const initialStages = [
  { name: "Build Application", tool: "Maven / Spring Boot", icon: "⚙️" },
  { name: "Unit Testing", tool: "JUnit 5", icon: "🧪" },
  { name: "Integration Testing", tool: "MockMvc", icon: "🔗" },
  { name: "Contract Testing", tool: "Pact", icon: "📋" },
  { name: "Infrastructure Testing", tool: "Testcontainers", icon: "🐳" },
];

export default function App() {
  const [stages, setStages] = useState(
    initialStages.map((s) => ({ ...s, status: "Waiting" }))
  );
  const [running, setRunning] = useState(false);
  const [runs, setRuns] = useState(0);
  const [history, setHistory] = useState([]);

  const passed = stages.filter((s) => s.status === "Passed").length;
  const progress = Math.round((passed / stages.length) * 100);

  function runPipeline() {
    if (running) return;

    setRunning(true);
    setRuns((n) => n + 1);
    setHistory((h) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), status: "Running" },
      ...h,
    ]);

    setStages(
      initialStages.map((s, i) => ({
        ...s,
        status: i === 0 ? "Running" : "Waiting",
      }))
    );

    initialStages.forEach((stage, index) => {
      setTimeout(() => {
        setStages((current) =>
          current.map((s, i) => {
            if (i === index) return { ...s, status: "Passed" };
            if (i === index + 1) return { ...s, status: "Running" };
            return s;
          })
        );

        if (index === initialStages.length - 1) {
          setRunning(false);
          setHistory((h) =>
            h.map((item, i) =>
              i === 0 ? { ...item, status: "Passed" } : item
            )
          );
        }
      }, (index + 1) * 900);
    });
  }

  function resetPipeline() {
    if (running) return;
    setStages(initialStages.map((s) => ({ ...s, status: "Waiting" })));
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">CI</span>
          <div><b>TestFlow</b><small>Quality Platform</small></div>
        </div>
        <p className="nav-heading">WORKSPACE</p>
        <div className="nav active">▦ &nbsp; Dashboard</div>
        <div className="nav">⇄ &nbsp; Pipelines</div>
        <div className="nav">✓ &nbsp; Test Reports</div>
        <div className="nav">⌘ &nbsp; Environments</div>
        <div className="sidebar-profile">
          <div className="avatar">PK</div>
          <div><b>Pius Kichere</b><small>24BAI70989</small></div>
          <span className="online" />
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div><small>Workspace / Experiments</small>
            <h1>CI Testing Dashboard</h1></div>
          <span className="environment">● Demo Environment</span>
        </header>

        <section className="hero">
          <div>
            <span className="eyebrow">CONTINUOUS INTEGRATION · CO6 – BT6</span>
            <h2>Build better. Test earlier.<br />Ship confidently.</h2>
            <p>Automate your build and testing workflow to identify defects
              early and maintain application quality.</p>
            <div className="student-tags">
              <span>👨‍🎓 Pius Kichere</span>
              <span>🪪 UID: 24BAI70989</span>
              <span>☕ Java 17+</span>
            </div>
          </div>
          <div className="hero-art">🚀</div>
        </section>

        <section className="stats">
          <article className="stat"><span className="stat-icon purple">↻</span>
            <p>Pipeline runs</p><h2>{runs}</h2><small>This session</small>
          </article>
          <article className="stat"><span className="stat-icon green">✓</span>
            <p>Stages passed</p><h2>{passed}<em> / 5</em></h2><small>Completed stages</small>
          </article>
          <article className="stat"><span className="stat-icon blue">◴</span>
            <p>Progress</p><h2>{progress}%</h2>
            <div className="progress"><div style={{ width: `${progress}%` }} /></div>
          </article>
          <article className="stat"><span className="stat-icon orange">⚡</span>
            <p>Pipeline status</p>
            <h2 className="status-title">{running ? "Running" : passed === 5 ? "Passed" : "Ready"}</h2>
            <small>{running ? "Executing stages…" : "Awaiting execution"}</small>
          </article>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div><span className="eyebrow">AUTOMATION WORKFLOW</span>
              <h2>Pipeline stages</h2>
              <p>Run the pipeline to see the workflow in action.</p>
            </div>
            <div className="buttons">
              <button className="secondary" onClick={resetPipeline} disabled={running}>Reset</button>
              <button className="primary" onClick={runPipeline} disabled={running}>
                {running ? "⏳ Running…" : "▶ Run pipeline"}
              </button>
            </div>
          </div>

          <div className="stages">
            {stages.map((stage, i) => (
              <div className="stage" key={stage.name}>
                <div className={`stage-icon stage-${i}`}>{stage.icon}</div>
                <div className="stage-info"><b>{stage.name}</b><small>{stage.tool}</small></div>
                <span className={`badge ${stage.status.toLowerCase()}`}>
                  {stage.status === "Passed" ? "✓ " : ""}{stage.status}
                </span>
              </div>
            ))}
          </div>
          <div className="panel-footer">
            <span>{running ? "● Pipeline execution in progress" : "● Pipeline ready"}</span>
            <span>{passed} of 5 stages completed</span>
          </div>
        </section>

        <section className="lower">
          <div className="panel">
            <span className="eyebrow">TESTING STRATEGY</span>
            <h2>Testing modules</h2>
            {[
              ["UT", "Unit testing", "JUnit 5 · Individual methods", "purple"],
              ["IT", "Integration testing", "MockMvc · REST APIs", "blue"],
              ["CT", "Contract testing", "Pact · Service agreements", "orange"],
              ["TC", "Infrastructure testing", "Testcontainers · Dependencies", "green"],
            ].map(([icon, name, desc, color]) => (
              <div className="module" key={name}>
                <span className={`module-icon ${color}`}>{icon}</span>
                <div><b>{name}</b><small>{desc}</small></div>
              </div>
            ))}
          </div>

          <div className="panel">
            <span className="eyebrow">STUDENT PROFILE</span>
            <h2>Experiment details</h2>
            <div className="student-card">
              <div className="large-avatar">PK</div>
              <h3>Pius Kichere</h3>
              <p>Continuous Integration & Testing</p>
              <div className="detail"><span>Student UID</span><b>24BAI70989</b></div>
              <div className="detail"><span>Course outcome</span><b>CO6 – BT6</b></div>
              <div className="detail"><span>Framework</span><b>Spring Boot</b></div>
              <button className="secondary print" onClick={() => window.print()}>
                ⤓ Print / Save PDF
              </button>
            </div>
          </div>
        </section>

        <section className="panel history-panel">
          <span className="eyebrow">RECENT ACTIVITY</span>
          <h2>Pipeline execution history</h2>
          {history.length === 0 ? <p className="empty">No runs yet. Start your first pipeline above.</p> :
            history.map((item) => (
              <div className="history-row" key={item.id}>
                <span>↻</span><div><b>Pipeline run #{runs - history.indexOf(item)}</b>
                  <small>{item.time}</small></div>
                <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
              </div>
            ))}
        </section>

        <footer><span>TestFlow · CI Laboratory</span>
          <span>Student UID: 24BAI70989 · CO6 – BT6</span></footer>
      </main>
    </div>
  );
}
