require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import {
  AuthRouter,
  DoctorRouter,
  PaymentRouter,
  UserRouter,
} from "./routes/index";
import { authenticationMiddleware } from "./authMiddleware";
const app = express();
app.use(express.json());

async function connectDb() {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/hospital"
    );
    console.log("successfully connected to the database");
  } catch (error) {
    console.log("error connecting to  the database");
  }
}

connectDb();

app.use("/api/auth", AuthRouter);
app.use("/api/user", authenticationMiddleware, UserRouter);
app.use("/api/doctor", authenticationMiddleware, DoctorRouter);
app.use("/api/payment", authenticationMiddleware, PaymentRouter);

app.listen(8000, () => console.log("server listening on port 8000"));
