# IoT Environmental Monitoring & Anomaly Detection System

A full‑stack real‑time environmental monitoring platform that ingests live sensor data, detects anomalies using rules + AI, and visualizes alerts on a live dashboard.

---

## Architecture Overview

**3 services** work together:

1. **Sensor Simulator (sensor)** → Generates environmental data (temperature, humidity, AQI)
2. **Backend API (backend)** → Processes data, detects anomalies, stores alerts
3. **Frontend Dashboard (frontend)** → Visualizes live metrics & alerts via WebSockets

```
Sensor → WebSocket → Backend → DB + AI Detection → Alerts → Frontend Dashboard
```

---

## Tech Stack

### Backend

* Node.js + Express
* MongoDB
* WebSockets (real‑time streaming)
* Rule Engine + AI Anomaly Detection
* Twilio alert integration
* Docker support

### Frontend

* React.js
* Real‑time charts
* Live alert panel
* Threshold management UI

### Sensor Simulator

* Node.js data generator
* Configurable sensor patterns
* Anomaly injection

---

## Project Structure

```
root
 ├── backend   # API + anomaly detection engine
 ├── frontend  # React dashboard
 └── sensor    # simulated IoT device
```

---

## Environment Variables

Create `.env` file in each service.

### Backend `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/iot
TWILIO_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=
ALERT_PHONE=
```

### Frontend `.env`

```
REACT_APP_API=http://localhost:5000
REACT_APP_SOCKET=http://localhost:5000
```

### Sensor `.env`

```
SERVER_SOCKET=http://localhost:5000
DEVICE_ID=device-1
```

---

## Running Locally

### 1️⃣ Start Backend

```
cd backend
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

### 2️⃣ Start Frontend

```
cd frontend
npm install
npm start
```

Dashboard:

```
http://localhost:3000
```

---

### 3️⃣ Start Sensor Simulator

```
cd sensor
npm install
node src/index.js
```

Now live data will begin streaming to the dashboard.

---

## Features

### Real‑Time Monitoring

* Temperature, Humidity, AQI charts
* Live KPI cards
* Device status monitoring

### Alert System

* Threshold‑based alerts
* AI anomaly detection
* Live alert panel
* SMS notifications

### Threshold Management

* Update thresholds from UI
* Dynamic rule engine reload

### AI Detection

* Detects abnormal sensor patterns
* Stores anomaly history

---

## Docker (Optional)

Each service includes a Dockerfile:

```
docker build -t iot-backend ./backend
docker build -t iot-frontend ./frontend
docker build -t iot-sensor ./sensor
```

---

## API Endpoints (Important)

### Sensor Data

```
POST /sensor/data
GET  /sensor/latest
```

### Alerts

```
GET /alerts
```

### Thresholds

```
GET  /thresholds
PUT  /thresholds
```

### Anomalies

```
GET /anomalies
```

---

## WebSocket Events

| Event            | Description             |
| ---------------- | ----------------------- |
| sensor:data      | incoming sensor reading |
| alert:new        | triggered alert         |
| anomaly:detected | AI anomaly              |

---

## Use Case Examples

* Smart factories
* Greenhouse monitoring
* Server room monitoring
* Smart cities air quality monitoring

---

## Future Improvements

* ML model training from historical data
* Multiple device clustering
* User authentication
* Cloud deployment (AWS/GCP/Azure)

---

## License

MIT License
