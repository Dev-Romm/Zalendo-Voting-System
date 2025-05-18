import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: 'server/.env' });
}

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.clientUrl }));

const __filename = fileURLToPath(import.meta.url);
console.log("FILENAME", __filename);
const __dirname = path.dirname(__filename);
console.log("DIRNAME", __dirname);

console.log(path.join(__dirname, "../client/dist/index.html"));

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../client/dist"))); // Serve static files from the React app

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
}); // The "/*" route serves the React app for any other routes

app.listen(process.env.port, async () => {
  console.log("Server is running on port", process.env.port);
  try {
    await mongoose.connect(process.env.mongoUrl);

    console.log("Database connected successfully.");
  } catch (error) {
    console.log(error);
  }
});
