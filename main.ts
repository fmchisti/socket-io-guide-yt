import express from "express";
import http from "node:http";
import path from "node:path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);
app.use(express.static(path.resolve("./client")));

app.get("/test", (req, res) => {
  res.send("OK");
});

io.on("connection", (socket) => {
  console.log("I client connected ID: ", socket.id);

  socket.on("disconnect", () => {
    console.log("A client dicsonnected id: " + socket.id);
  });

  socket.on("fahim", (message) => {
    io.emit("message", socket.id + ": " + message);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
