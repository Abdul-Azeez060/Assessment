import express from "express";
const DoctorRouter = express.Router();

import {
  getCurrentAppointmentsController,
  getAppointmentsHistoryController,
  getTransactionHistoryController,
} from "../controllers/doctorController";

export default DoctorRouter;

// Route to get all current appointments for a doctor
DoctorRouter.get(
  "/current-appointments",
  getCurrentAppointmentsController as any
);

// Route to get appointment history with an option for file download
DoctorRouter.get(
  "/appointments-history",
  getAppointmentsHistoryController as any
);

// Route to get transaction history for a doctor
DoctorRouter.get(
  "/transaction-history",
  getTransactionHistoryController as any
);

module.exports = DoctorRouter;
