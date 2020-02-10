import e = require("express");
import { password, secret } from "../config";
let jwt = require("jsonwebtoken");

export const login = (req: e.Request, res: e.Response) => {
  const pw = req.body.password;
  if (pw === password) {
    const token = jwt.sign({ data: pw }, secret, {
      expiresIn: 604800 //1 week
    });

    res.json({
      error: false,
      token: token
    });
  } else {
    res.status(400).json({ error: true, text: "Password didnt match" });
  }
};
