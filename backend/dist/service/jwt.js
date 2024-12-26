"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
exports.setUser = setUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET_KEY || "default_secret_key";
function getUser(token) {
    try {
        const userObj = jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return null;
            }
            return res;
        });
        return userObj;
    }
    catch (error) {
        return null;
    }
}
function setUser(id, role) {
    try {
        const token = jsonwebtoken_1.default.sign({
            id,
            role,
            exp: Math.floor(Date.now() / 1000) + 2 * 7 * 24 * 60 * 60, // 2 weeks
        }, JWT_SECRET);
        return token;
    }
    catch (error) {
        console.error("Error generating JWT:", error);
        return null;
    }
}
