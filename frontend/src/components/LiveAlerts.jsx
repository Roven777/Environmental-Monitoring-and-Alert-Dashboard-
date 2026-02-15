import React from "react";

function formatTime(timestamp) {
  if (!timestamp) return "--";

  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}

export default function LiveAlerts({ alerts }) {

  return (
    <div className="live-alerts">
      <h3>Live Alerts</h3>

      <div className="alerts-container">
        {alerts.length === 0 && <p>No alerts</p>}

        {alerts.map((a, i) => (
          <div key={i} className={`alert ${a.severity.toLowerCase()}`}>
            <b>{a.severity}</b> — {a.message}
            <div className="time">{formatTime(a.timestamp)}</div>
          </div>
        ))}

      </div>
    </div>
  );
}
