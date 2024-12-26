import { Request, Response } from "express";
import { Doctor } from "../models/DoctorModel";
import { Appointment } from "../models/AppointmentModel";
import { Wallet } from "../models/WalletModel";
import { Slot } from "../models/SlotModel";

export async function getCurrentAppointmentsController(
  req: Request,
  res: Response
) {
  try {
    // Logic to fetch current appointments
    const doctorId = res.locals.currUser.id;
    const appointments = await Doctor.findById(doctorId).populate({
      path: "slotId",
    });
    return res.status(200).json({
      success: true,
      data: { appointments }, // Return actual data here
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
    const doctorId = res.locals.currUser.id;
    const appointmentsHistory = await Appointment.find({
      doctorId: doctorId,
    }).populate({ path: "userId" });
    // Logic to fetch appointments history
    return res.status(200).json({
      success: true,
      data: { appointmentsHistory }, // Return actual data here
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
    const doctorId = res.locals.currUser.id;
    const walletHistory = await Wallet.find({ entityId: doctorId });

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

export async function addSlotController(req: Request, res: Response) {
  const doctorId = res.locals.currUser.id;
  const { slotsArray } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        data: { message: "Doctor not found" },
      });
    }
    slotsArray.forEach(async (slot: any) => {
      const newSlot = new Slot({ ...slot, doctorId, fee: doctor.fee });
      await newSlot.save();
    });

    return res.status(200).json({
      success: true,
      data: { message: "Slot added successfully" },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: { error },
    });
  }
}
