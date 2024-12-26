import { Request, Response } from "express";
import { Appointment } from "../models/AppointmentModel";
import User from "../models/UserModel";
import { Wallet } from "../models/WalletModel";
import { Slot } from "../models/SlotModel";
import mongoose from "mongoose";
import { Doctor } from "../models/DoctorModel";

export async function getCurrentAppointmentsController(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.currUser.id;
    const data = await User.findById(userId).populate({
      path: "currentAppointments",
    });
    const currentAppointments = data?.currentAppointments;
    // Logic to fetch current appointments
    return res.status(200).json({
      success: true,
      data: { currentAppointments }, // Return actual data here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}

export async function getAppointmentsHistoryController(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.currUser.id;
    const history = await Appointment.find({ userId }).populate({
      path: "doctorId",
    });

    // Logic to fetch appointments history

    return res.status(200).json({
      success: true,
      data: { history }, // Return actual data here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}

export async function getTransactionHistoryController(
  req: Request,
  res: Response
) {
  try {
    const userId = res.locals.currUser.id;
    const walletHistory = await Wallet.find({ userId });

    // Logic to fetch transaction history
    return res.status(200).json({
      success: true,
      data: { walletHistory }, // Return actual data here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}

export async function getDiscountController(req: Request, res: Response) {
  try {
    const userId = res.locals.currUser.id;
    const doctorId = req.params.doctorid;
    const getsDiscount = await Appointment.findOne(
      { userId, doctorId },
      { _id: 1 }
    );
    if (!getsDiscount) {
      return res.status(200).json({
        success: true,
        message: "Eligible for discount",
        data: { getsDiscount: true },
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Not eligible for discount",
        data: { getsDiscount: false },
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: { err },
    });
  }
}

// sent by the user
export async function getDoctorSlotsController(req: Request, res: Response) {
  try {
    // Logic to fetch doctor's slots
    const doctorId = req.params.doctorid;
    const slots = await Slot.find({ doctorId });

    return res.status(200).json({
      success: true,
      data: { slots }, // Return actual data here
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}

// sent by the user
export async function bookSlotController(req: Request, res: Response) {
  const session = await mongoose.startSession();
  try {
    // Logic to book a doctor's slot
    const { slotId, userId, doctorId } = req.body;
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(400).json({
        success: false,
        data: { message: "Slot not found" },
      });
    }
    // Check if slot is already booked if yes return 402
    if (slot?.isBooked) {
      return res.status(402).json({
        success: false,
        data: { message: "Slot already booked" },
      });
    }

    //transaction

    session.startTransaction();

    // update the slot to booked
    await slot.updateOne({ isBooked: true }, { session });
    // create appointment object containing all the details
    const appointment = new Appointment({
      userId,
      doctorId,
      slotId,
      disCountApplied: true,
      startTime: slot.startTime,
      endTime: slot.endTime,
      fee: slot.fee,
      date: slot.date,
    });

    // add the ref to the user and doctor currAppointment arrays
    const appointmentId = await appointment.save({ session });
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { currentAppointments: appointmentId },
      },
      { new: true } // Return the updated document
    ).session(session);

    await Doctor.findByIdAndUpdate(
      doctorId,
      {
        $push: { currentAppointments: appointmentId },
      },
      { new: true } // Return the updated document
    ).session(session);
    await session.commitTransaction();
    return res.status(200).json({
      success: true,
      message: "Slot booked successfully",
      data: { appointmentId }, // Return actual data here
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      success: false,
      data: { error },
    });
  } finally {
    session.endSession();
  }
}
