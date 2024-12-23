import mongoose from "mongoose";

const { Schema } = mongoose;
export enum Status {
  "completed",
  "pending",
  "missed",
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
  currentAppointments: [
    [
      {
        doctorId: Schema.Types.ObjectId,
        status: Status,
        fee: Number,
        date: Date.now,
        time: Date.now,
      },
    ],
  ],
});

const User = mongoose.model("User", UserSchema);
export default User;
