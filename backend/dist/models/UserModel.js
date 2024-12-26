"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
var Status;
(function (Status) {
    Status[Status["completed"] = 0] = "completed";
    Status[Status["pending"] = 1] = "pending";
    Status[Status["missed"] = 2] = "missed";
})(Status || (exports.Status = Status = {}));
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    walletBalance: {
        type: Number,
        default: 0,
    },
    currentAppointments: [
        {
            appointmentId: {
                type: Schema.Types.ObjectId,
                ref: "Appointment",
            },
        },
    ],
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
