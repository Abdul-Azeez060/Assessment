"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = exports.DoctorRouter = exports.UserRouter = void 0;
const UserRouter_1 = __importDefault(require("./UserRouter"));
exports.UserRouter = UserRouter_1.default;
const DoctorRouter_1 = __importDefault(require("./DoctorRouter"));
exports.DoctorRouter = DoctorRouter_1.default;
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
exports.AuthRouter = AuthRouter_1.default;
