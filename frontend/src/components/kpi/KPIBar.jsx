import "../../styles/dashboard.css";

function statusColor(status) {
  switch (status) {
    case "CRITICAL": return "#ef4444";
    case "WARNING": return "#f59e0b";
    case "ANOMALY": return "#a855f7";
    case "NORMAL": return "#22c55e";
    default: return "#94a3b8";
  }
}

export default function KPIBar({ latest }) {

  const statusText = latest?.systemStatus || "LOADING";
  const color = statusColor(statusText);

  return (
    <div className="kpi-grid">

      <div className="kpi-card">
        <div className="kpi-value">{latest?.temperature ?? "--"}°C</div>
        <div className="kpi-label">Temperature</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-value">{latest?.humidity ?? "--"}%</div>
        <div className="kpi-label">Humidity</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-value">{latest?.airQuality ?? "--"}</div>
        <div className="kpi-label">Air Quality</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-value" style={{ color }}>
          {statusText}
        </div>
        <div className="kpi-label">System Status</div>
      </div>

    </div>
  );
}
