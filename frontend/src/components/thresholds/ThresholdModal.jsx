import { useState } from "react";
import axios from "axios";
import "../../styles/dashboard.css";

export default function ThresholdModal() {

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    temperature: "",
    humidity: "",
    airQuality: ""
  });

  const submit = async () => {
    await axios.post("/api/threshold", {
      temperature: { max: Number(form.temperature) },
      humidity: { max: Number(form.humidity) },
      airQuality: { max: Number(form.airQuality) }
    });

    setOpen(false);
    alert("Threshold Updated");
  };

  return (
    <>
      {/* floating modal */}
      {open && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Custom Alert Rules</h3>

            <input placeholder="Temperature Max"
              onChange={e => setForm({...form, temperature:e.target.value})}/>

            <input placeholder="Humidity Max"
              onChange={e => setForm({...form, humidity:e.target.value})}/>

            <input placeholder="AQI Max"
              onChange={e => setForm({...form, airQuality:e.target.value})}/>

            <div className="modal-actions">
              <button className="save-btn" onClick={submit}>Save</button>
              <button className="cancel-btn" onClick={()=>setOpen(false)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

      {/* event listener trigger */}
      <div id="open-threshold-modal" onClick={()=>setOpen(true)}></div>
    </>
  );
}
