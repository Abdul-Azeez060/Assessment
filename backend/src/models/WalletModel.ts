import mongoose, { Schema } from "mongoose";

export enum Role {
  "doctor",
  "user",
}

enum TransactionType {
  "credit",
  "debit",
}

const WalletSchema = new mongoose.Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  role: {
    type: Role,
    enum: Role,
    required: true,
  },
  transactionType: {
    type: String,
    enum: TransactionType,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
  },
  balanceAfterTransaction: {
    type: Number,
  },
});

export const Wallet = mongoose.model("Wallet", WalletSchema);
