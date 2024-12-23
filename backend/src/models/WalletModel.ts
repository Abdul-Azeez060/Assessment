import mongoose, { Schema } from "mongoose";

enum Role {
  "doctor",
  "user",
}

enum TransactionType {
  "credit",
  "debit",
}

const WalletSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: Role,
  },
  transactionType: {
    type: TransactionType,
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

const Wallet = mongoose.model("Wallet", WalletSchema);
export default Wallet;
