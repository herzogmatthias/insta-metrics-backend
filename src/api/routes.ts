import e = require("express");
import {
  basicInformation,
  lastThreePosts,
  pricePerPost
} from "./basicInformationController";
import { newUser, deleteUser } from "./UserController";
import { login } from "./loginController";
import { checkToken } from "../middleware/jwt_middleware";
import { getCommentsandLikesXPictures } from "./AdvancedInformationController";

const routes = (app: e.Express) => {
  app.route("/basic-information").get(checkToken, basicInformation);
  app.route("/new-user/:username").get(checkToken, newUser);
  app.route("/login").post(login);
  app.route("/delete-user/:username").get(checkToken, deleteUser);
  app
    .route("/advanced-information/comments-and-likes/:username")
    .post(getCommentsandLikesXPictures);
  app
    .route("/basic-information/last-three-pictures/:username")
    .get(lastThreePosts);
  app.route("/advanced-information/price-per-post/:username").get(pricePerPost);
};

export default routes;
