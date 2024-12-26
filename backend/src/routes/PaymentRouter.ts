import express from "express";
const PaymentRouter = express.Router();
import { paymentVerificationController } from "../controllers/paymentController";

PaymentRouter.post("/verification", paymentVerificationController as any);

export default PaymentRouter;
