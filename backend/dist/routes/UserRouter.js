"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter = express_1.default.Router();
const userController_1 = require("../controllers/userController");
// Route to get all current appointments
UserRouter.get("/current-appointments", userController_1.getCurrentAppointmentsController);
// Route to get appointment history
UserRouter.get("/appointments-history", userController_1.getAppointmentsHistoryController);
// Route to get transaction history
UserRouter.get("/transaction-history", userController_1.getTransactionHistoryController);
exports.default = UserRouter;
