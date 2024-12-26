"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = signUpController;
exports.signInController = signInController;
const DoctorModel_1 = require("../models/DoctorModel");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jwt_1 = require("../service/jwt");
function signUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Logic to handle user/doctor sign-up (e.g., validating data, saving to DB, hashing password)
            const data = req.body.data;
            const role = req.body.role;
            if (role == "doctor") {
                yield DoctorModel_1.Doctor.create(data);
            }
            else {
                yield UserModel_1.default.create(data);
            }
            return res.status(200).json({
                success: true,
                message: `Signed up successfully`,
                data: {}, // Return actual data here
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                data: { error },
            });
        }
    });
}
function signInController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Logic to handle user/doctor sign-in (e.g., validating credentials, generating JWT)
            const data = req.body.data;
            const role = req.body.role;
            let profile = null;
            let token = null;
            if (role == "doctor") {
                profile = yield DoctorModel_1.Doctor.findOne({
                    phone: data.phone,
                });
                if (!profile) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found",
                        data: null,
                    });
                }
                token = (0, jwt_1.setUser)(profile._id, "doctor");
            }
            else {
                profile = yield UserModel_1.default.findOne({
                    phone: data.phone,
                });
                if (!profile) {
                    return res.status(401).json({
                        success: false,
                        message: "User not found",
                        data: null,
                    });
                }
                token = (0, jwt_1.setUser)(profile._id, "user");
            }
            return res.status(200).json({
                success: true,
                message: "Signed in successfully",
                data: { token },
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                data: { error },
            });
        }
    });
}
