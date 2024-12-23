require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
const app = express();

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

app.listen(8000, () => console.log("server listening on port 8000"));
