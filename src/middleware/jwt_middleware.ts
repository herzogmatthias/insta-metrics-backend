let jwt = require("jsonwebtoken");
import e = require("express");
import { secret } from "../config";

export const checkToken = (req: e.Request, res: e.Response, next: any) => {
  let token: string =
    (req.headers["x-access-token"] as string) ||
    (req.headers["authorization"] as string); // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) {
        res.status(500).json({
          success: false,
          err: "Token is not valid"
        });
      } else {
        next();
      }
    });
  } else {
    res.status(500).json({
      success: false,
      err: "Auth token is not supplied"
    });
  }
};
