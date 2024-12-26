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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./routes/index");
const authMiddleware_1 = require("./authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/hospital");
            console.log("successfully connected to the database");
        }
        catch (error) {
            console.log("error connecting to  the database");
        }
    });
}
connectDb();
app.use("/api/auth", index_1.AuthRouter);
app.use("/api/user", authMiddleware_1.authenticationMiddleware, index_1.UserRouter);
app.use("/api/doctor", authMiddleware_1.authenticationMiddleware, index_1.DoctorRouter);
app.listen(8000, () => console.log("server listening on port 8000"));
