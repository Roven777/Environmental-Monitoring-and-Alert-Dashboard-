import { useEffect, useState } from "react";
import { socket } from "../socket/socket";

export default function useSocketData() {

  const [latest, setLatest] = useState(null);
  const [stream, setStream] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    socket.on("connect", () => {
      console.log("🟢 Connected to sensor stream:", socket.id);
    });

    /* SENSOR STREAM */
    socket.on("sensor-data", (data) => {

        if (!data?.timestamp) return;

        const t = new Date(data.timestamp).getTime();

        const point = {
            time: t,
            temperature: Number(data.temperature),
            humidity: Number(data.humidity),
            airQuality: Number(data.airQuality),
            anomaly: data.anomaly ?? false,
            systemStatus: data.systemStatus || "NORMAL"   // ⭐ IMPORTANT
        };

        setLatest(point);

        setStream(prev => {
            const updated = [...prev, point];
            return updated.length > 30 ? updated.slice(-30) : updated;
        });

    });

    /* ALERT STREAM */
    socket.on("alert", (alert) => {
      if (!alert) return;
      setAlerts(prev => [alert, ...prev].slice(0, 25));
    });

    return () => {
      socket.off("connect");
      socket.off("sensor-data");
      socket.off("alert");
    };

  }, []);

  return { latest, stream, alerts };
}
