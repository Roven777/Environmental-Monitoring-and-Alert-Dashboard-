import "../../styles/dashboard.css";

import TempChart from "./TempChart";
import HumidityChart from "./HumidityChart";
import AQIChart from "./AQIChart";


export default function ChartGrid({ data }) {
  return (
    <div className="chart-grid">
      <div className="chart-box"><TempChart data={data} /></div>
      <div className="chart-box"><HumidityChart data={data} /></div>
      <div className="chart-box"><AQIChart data={data} /></div>
    </div>
  );
}
