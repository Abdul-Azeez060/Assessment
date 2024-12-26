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
    type: String,
    enum: Status,
    default: Status.pending,
  },
  fee: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  disCountApplied: {
    type: Boolean,
  },
});

AppointmentSchema.index({ doctorId: 1, userId: 1 }, { unique: true });
export const Appointment = mongoose.model("Appointment", AppointmentSchema);
