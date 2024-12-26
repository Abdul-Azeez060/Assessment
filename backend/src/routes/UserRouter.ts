import express from "express";
const UserRouter = express.Router();
import {
  getCurrentAppointmentsController,
  getAppointmentsHistoryController,
  getTransactionHistoryController,
  getDoctorSlotsController,
  bookSlotController,
} from "../controllers/userController";

// Route to get all current appointments
UserRouter.get(
  "/current-appointments",
  getCurrentAppointmentsController as any
);

// Route to get appointment history
UserRouter.get(
  "/appointments-history",
  getAppointmentsHistoryController as any
);

// Route to get transaction history
UserRouter.get("/transaction-history", getTransactionHistoryController as any);

// Route to get all slots of a specific doctor
UserRouter.get("/:doctorid", getDoctorSlotsController as any);

// Route to book a slot for a doctor
UserRouter.post("/book-slot", bookSlotController as any);

UserRouter.get("/get-discount/:doctorid", getDiscountController as any);

export default UserRouter;
