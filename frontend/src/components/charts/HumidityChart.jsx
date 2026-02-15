import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const HumidityChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No humidity data</p>;
  }

  return (
    <div>
      <h3>Humidity (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
  dataKey="time"
  tickFormatter={(t) =>
    new Date(t).toLocaleTimeString([], { hour:"2-digit",minute: "2-digit", second: "2-digit" })
  }
/>
         
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#007bff"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityChart;
