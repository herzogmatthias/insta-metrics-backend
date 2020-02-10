import e = require("express");
import { basicInformation } from "./basicInformationController";
import { newUser } from "./newUserController";
import { login } from "./loginController";
import { checkToken } from "../middleware/jwt_middleware";

const routes = (app: e.Express) => {
  app.route("/basic-information").get(checkToken, basicInformation);
  app.route("/new-user/:username").get(checkToken, newUser);
  app.route("/login").post(login);
};

export default routes;
