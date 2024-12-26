"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = authenticationMiddleware;
const express_1 = require("express");
function authenticationMiddleware(req, res, next) {
    const token = express_1.request.headers.authorization;
    if (!token) {
        express_1.response.redirect("/api/sign-in");
        return next();
    }
    res.locals.currUser = token;
}
