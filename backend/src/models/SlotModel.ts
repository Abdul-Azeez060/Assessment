import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  fee: { type: Number, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});
SlotSchema.index({ doctorId: 1 });
export const Slot = mongoose.model("Slot", SlotSchema);
