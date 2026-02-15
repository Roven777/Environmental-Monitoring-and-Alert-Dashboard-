import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const TemperatureChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No temperature data</p>;
  }

  return (
    <div>
      <h3>Temperature (°C)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
  dataKey="time"
  tickFormatter={(t) =>
    new Date(t).toLocaleTimeString([], {hour:"2-digit", minute: "2-digit", second: "2-digit" })
  }
/>
        
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff7300"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
