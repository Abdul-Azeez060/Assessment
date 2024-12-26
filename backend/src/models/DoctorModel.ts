import mongoose, { Schema } from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  fee: {
    type: Number,
  },
  currentAppointments: [
    {
      slotId: {
        type: Schema.Types.ObjectId,
        ref: "Slot",
      },
    },
  ],
});

export const Doctor = mongoose.model("Doctor", DoctorSchema);
