import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./route.js";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin:process.env.clientUrl}))
app.listen(process.env.port, async () => {
  console.log("Server is running...");
  try {
    await mongoose.connect(process.env.mongoUrl);

    console.log("Database connected successfully.");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api",router);

