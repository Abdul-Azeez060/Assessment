import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/UserModel";
import { Doctor } from "../models/DoctorModel";
import axios from "axios";

export async function paymentVerificationController(
  req: Request,
  res: Response
) {
  // Payment verification logic
  const { userId, doctorId, amount, hasDiscount, slotId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    const doctor = await Doctor.findById(doctorId).session(session);
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    // check if the given amount is eqaul to the doctos's fees
    if (!hasDiscount) {
      if (amount !== doctor.fee) {
        throw new Error("Invalid amount");
      }
    } else {
      if (amount !== doctor.fee! - 100) {
        throw new Error("Invalid amount");
      }
    }
    // update user's wallet
    user.walletBalance = user.walletBalance - amount;
    await user.save({ session });

    // update doctor's wallet
    doctor.walletBalance = doctor.walletBalance + amount;
    await doctor.save({ session });

    await session.commitTransaction();
    console.log("Transaction successful");
    return await axios.post("http://localhost:3000/api/user/book-slot", {
      userId,
      doctorId,
      slotId,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction failed:", error);
    return res.status(500).json({
      success: false,
      message: "Transaction failed",
      data: null,
    });
  } finally {
    session.endSession();
  }
}
