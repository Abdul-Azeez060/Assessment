import { NextFunction, Request, request, Response, response } from "express";
import { getUser } from "./service/jwt";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;
  console.log("this is the middleware");
  if (token) {
    const user = getUser(token);
    res.locals.currUser = user;
    console.log(res.locals.currUser, "this is the currUser");
    next();
  } else {
    res.locals.currUser = null;
    res.status(401).json({
      success: false,
      message: "User not logged in",
      data: null,
    });
  }
}
