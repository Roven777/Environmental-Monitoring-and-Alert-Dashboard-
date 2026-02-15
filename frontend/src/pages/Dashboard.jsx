import { useEffect } from "react";
import useSocketData from "../hooks/useSocketData";

import KPIBar from "../components/kpi/KPIBar";
import TempChart from "../components/charts/TempChart";
import HumidityChart from "../components/charts/HumidityChart";
import AirChart from "../components/charts/AQIChart";
import AlertPanel from "../components/alerts/AlertPanel";

import "../styles/dashboard.css";

export default function Dashboard() {

  const { latest, stream, alerts } = useSocketData();

  return (
    <div className="dashboard">

      {/* ===== TOP KPI BAR ===== */}
      <KPIBar latest={latest} />

      {/* ===== MIDDLE CHARTS ===== */}
      <div className="middle-grid">
        <div className="chart-box">
          <TempChart data={stream} />
        </div>

        <div className="chart-box">
          <HumidityChart data={stream} />
        </div>
      </div>

      {/* ===== BOTTOM AREA ===== */}
      <div className="bottom-grid">

        <div className="chart-box">
          <AirChart data={stream} />
        </div>

        <AlertPanel alerts={alerts} />

      </div>

    </div>
  );
}
