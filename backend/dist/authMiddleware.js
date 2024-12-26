"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = authenticationMiddleware;
const jwt_1 = require("./service/jwt");
function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;
    console.log("this is the middleware");
    if (token) {
        const user = (0, jwt_1.getUser)(token);
        res.locals.currUser = user;
        console.log(res.locals.currUser, "this is the currUser");
        next();
    }
    else {
        res.locals.currUser = null;
        res.status(401).json({
            success: false,
            message: "User not logged in",
            data: null,
        });
    }
}
