import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import serverless from "serverless-http";
import userRoutes from "./src/routes/user.routes.js";
import dataRoutes from "./src/routes/data.routes.js";
import connectDB from "./src/db/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.use("/api/v1", dataRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect to the database
connectDB()
  .then(() => {
    console.log("⚙️  MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });

// Export the serverless handler
export default serverless(app);
