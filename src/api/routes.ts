import e = require("express");

import {
  newUser,
  deleteUser,
  basicInformation,
  avgPriceForAds,
  getAvgEngagementRate,
  tags,
  avgCommentsAndLikes,
  generalInformation,
  graphData,
} from "./UserController";
import { login } from "./LoginController";
import { checkToken } from "../middleware/jwt_middleware";
import { postsForTags } from "./HashtagController";
import {
  lastFiftyPictures,
  detailsForPicture,
  erForPost,
  rankingForPicture,
} from "./PostController";

const routes = (app: e.Express) => {
  app.route("/user/basic-information").get(checkToken, basicInformation);
  app.route("/user/new/:username").get(checkToken, newUser);
  app.route("/login").post(login);
  app.route("/user/delete/:username").get(checkToken, deleteUser);
  app
    .route("/post/last-fifty-pictures/:username")
    .get(checkToken, lastFiftyPictures);
  app
    .route("/post/get-details-for-pictures/:shortcode")
    .get(checkToken, detailsForPicture);
  app
    .route("/user/avg-price-for-ads/:username")
    .get(checkToken, avgPriceForAds);
  app
    .route("/user/avg-likes-and-comments/:username")
    .get(checkToken, avgCommentsAndLikes);
  app
    .route("/user/avg-engagementrate/:username")
    .get(checkToken, getAvgEngagementRate);
  app
    .route("/user/general-information/:username")
    .get(checkToken, generalInformation);
  app.route("/user/graph-data/:username").get(checkToken, graphData);
  app.route("/post/er-for-post/:username").post(checkToken, erForPost);
  app.route("/user/tags/:username").get(checkToken, tags);
  app.route("/hashtag/posts-for-tag/:hashtag").get(checkToken, postsForTags);
  app
    .route("/post/rankings-for-picture/:shortcode")
    .get(checkToken, rankingForPicture);
};

export default routes;
