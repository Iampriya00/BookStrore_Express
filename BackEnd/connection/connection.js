const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    process.exit(1);
  }
}

connect();
