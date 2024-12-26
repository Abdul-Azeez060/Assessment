"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DoctorRouter = express_1.default.Router();
const doctorController_1 = require("../controllers/doctorController");
exports.default = DoctorRouter;
// Route to get all current appointments for a doctor
DoctorRouter.get("/api/doctor/current-appointments", doctorController_1.getCurrentAppointmentsController);
// Route to get appointment history with an option for file download
DoctorRouter.get("/api/doctor/appointments-history", doctorController_1.getAppointmentsHistoryController);
// Route to get transaction history for a doctor
DoctorRouter.get("/api/doctor/transaction-history", doctorController_1.getTransactionHistoryController);
// Route to get all slots of a specific doctor
DoctorRouter.get("/api/doctor/:doctorid", doctorController_1.getDoctorSlotsController);
// Route to book a slot for a doctor
DoctorRouter.post("/api/doctor/book-slot", doctorController_1.bookSlotController);
module.exports = DoctorRouter;
