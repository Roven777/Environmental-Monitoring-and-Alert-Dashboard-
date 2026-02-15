import "../../styles/dashboard.css";

function formatTime(ts) {
  if (!ts) return "--";
  return new Date(ts).toLocaleTimeString();
}

function sourceBadge(a) {
  if (a.generatedBy === "ANOMALY_CORRELATED")
    return <span className="ai-badge">AI</span>;

  if (a.generatedBy === "ANOMALY")
    return <span className="ai-badge anomaly">ANOMALY</span>;

  return null;
}

export default function AlertPanel({ alerts }) {

  const openModal = () => {
    document.getElementById("open-threshold-modal").click();
  };

  return (
    <div className="alert-panel">

      <div className="alert-header">
        <h3>Live Alerts</h3>
        <button className="config-btn" onClick={openModal}>⚙</button>
      </div>

      {alerts.map((a, i) => (
        <div key={i}
          className={`alert-item ${
            a.severity === "CRITICAL"
              ? "alert-critical"
              : a.severity === "ANOMALY"
              ? "alert-anomaly"
              : "alert-warning"
          }`}>

          <b>{a.severity}</b> {sourceBadge(a)} — {a.message}

          {/* ⭐ FIXED TIME — NEVER CHANGES */}
          <div className="alert-time">
            {formatTime(a.timestamp)}
          </div>

        </div>
      ))}

    </div>
  );
}
