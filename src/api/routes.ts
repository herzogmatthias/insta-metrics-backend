import e = require("express");

import {
  newUser,
  deleteUser,
  basicInformation,
  avgPriceForAds,
  getAvgEngagementRate,
  tags,
} from "./UserController";
import { login } from "./LoginController";
import { checkToken } from "../middleware/jwt_middleware";
import {
  getLastFiftyPictures,
  getDetailsForPicture,
  getAvgCommentsAndLikes,
  getErForPost,
} from "./PostController";
import { postsForTags } from "./HashtagController";

const routes = (app: e.Express) => {
  app.route("user/basic-information").get(checkToken, basicInformation);
  app.route("user/new/:username").get(newUser);
  app.route("/login").post(login);
  app.route("/user/delete/:username").get(checkToken, deleteUser);
  app
    .route("/post/get-last-fifty-pictures/:username")
    .get(getLastFiftyPictures);
  app
    .route("/post/get-details-for-pictures/:shortcode")
    .get(getDetailsForPicture);
  app.route("/user/avg-price-for-ads/:username").get(avgPriceForAds);
  app
    .route("/post/avg-likes-and-comments/:username")
    .get(getAvgCommentsAndLikes);
  app.route("/user/avg-engagementrate/:username").get(getAvgEngagementRate);
  app.route("/post/er-for-post/:username").post(getErForPost);
  app.route("/user/tags/:username").get(tags);
  app.route("/hashtag/posts-for-tag/:hashtag").get(postsForTags);
};

export default routes;
