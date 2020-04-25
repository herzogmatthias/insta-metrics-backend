import e = require("express");
let jwt = require("jsonwebtoken");

export const login = (req: e.Request, res: e.Response) => {
  const pw = req.body.password;
  if (pw === process.env.password) {
    const token = jwt.sign({ data: pw }, process.env.secret, {
      expiresIn: 604800, //1 week
    });

    res.json({
      error: false,
      token: token,
    });
  } else {
    res.status(400).json({ error: true, text: "Password didnt match" });
  }
};
