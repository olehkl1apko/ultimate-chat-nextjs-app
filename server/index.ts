import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import { User } from "./userModel";
import userRouter from "./userRoutes";

const app = express();
const server = http.createServer(app);
const { PORT } = process.env || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  server.listen(PORT, () => {
    console.log("Server was connected on port", PORT);
  });
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("joined", () => {
    io.sockets.emit("new-user", "new user joined");
  });

  socket.on("private message", async (to, message, mySelf) => {
    const user = await User.find({ email: to });
    const decoded = jwt.verify(mySelf, process.env.ACCESS_TOKEN_SECRET!);
    const sender = await User.findById(decoded);
    io.sockets.emit("refresh", "new Message");

    if (user) {
      user[0].messages.push({
        receiver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      sender?.messages.push({
        receiver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      await user[0].save();
      await sender?.save();
    }
  });
});

app.use("/", userRouter);
