import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  socket.on("join-room", (data) => {
    socket.join(data.room);
    console.log(`Room ${data.room} joined`);
  });

  socket.on("send-message", (data) => {
    console.log(socket.id, data);

    socket.to(data.room).emit("receive-message", data);
    console.log("sent");
  });
});

server.listen(3000, () => {
  console.log("server running at port 3000");
});
