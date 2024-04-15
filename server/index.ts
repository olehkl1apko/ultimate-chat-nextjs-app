import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

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
