const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const { chats } = require("./data/data");

app.get("/", (req, res) => {
  res.send("api setup done");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find(chat => chat._id === req.params.id);
  res.send(singleChat);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("listening on port: " + PORT));
