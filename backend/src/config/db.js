const mongoose = require("mongoose");

let connected = false;

async function connectDB() {
  if (connected) return;

  mongoose.set("strictQuery", true);

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  });

  connected = true;
  console.log("✅ MongoDB connected");
}

module.exports = connectDB;
