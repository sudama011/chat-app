const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.sendFile("api setup done");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("listening on port: " + PORT));
