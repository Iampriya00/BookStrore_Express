const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/connection");
const user = require("./routes/user");

app.use(express.json());

app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("Hello baby");
});

const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server", err);
  });
