import mongoose, { Schema } from "mongoose";
import { Status } from "./UserModel";

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Status,
  },
  fee: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  time: {
    type: Date,
  },
  disCountApplied: {
    type: Number,
  },
});
