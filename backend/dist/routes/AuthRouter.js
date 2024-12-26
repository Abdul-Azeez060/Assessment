"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRouter = express_1.default.Router();
const authController_1 = require("../controllers/authController");
// Route for user and doctor signup
AuthRouter.post("/sign-up", authController_1.signUpController);
// Route for user and doctor signin
AuthRouter.post("/sign-in", authController_1.signInController);
exports.default = AuthRouter;
