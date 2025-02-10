import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRoutes from "./src/routes/user.routes.js";
import dataRoutes from "./src/routes/data.routes.js"
import guarantorRoutes from "./src/routes/guarantor.routes.js"
import connectDB from "./src/db/index.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://smit-hackathon-frontend-peach.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



app.use("/api/v1", userRoutes);
app.use("/api/v1", dataRoutes);
app.use("/api/v1", guarantorRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });