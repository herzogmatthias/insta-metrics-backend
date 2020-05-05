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
  /**
   * @api {get} /user/basic-information
   * @apiName GetBasicInformation
   * @apiDescription Get the Basic Informations for all Users
   * @apiGroup User
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   * @apiSuccess {BasicUserInformation[]} users Array of Users
   * @apiSuccess {String} users.username Unique Username of the User
   * @apiSuccess {String} users.name Not unique name of the User
   * @apiSuccess {String} users.avatar Profile Picture Url of the User
   * @apiSuccess {Boolean} users.isBot Is User a selfmade Bot?
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      [
   *        {
   *          "avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/90180510_1304649566401948_7586900621320519680_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=0CJxWiguaUgAX88w5p8&oh=37b807b7fc03a7c7165e0f9752b2f5e9&oe=5EDA7458",
   *          "name": "TouchedMePickles",
   *          "username": "memez.every.day.bro",
   *          "isBot": true
   *        },
   *        {
   *          "avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B",
   *          "name": "Kylie 🤍",
   *          "username": "kyliejenner",
   *          "isBot": false
   *        }
   *      ]
   * @apiError RateLimitReached The Rate Limit of IG reached
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/user/basic-information").get(checkToken, basicInformation);
  /**
   * @api {get} /user/new/:username
   * @apiName NewUser
   * @apiDescription Add a new User by Username
   * @apiGroup User
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   * @apiSuccess {Boolean} error Error happend?
   * @apiSuccess {String} text Text to descripe what happend
   * @apiSuccess {BasicUserInformation} user The New User
   * @apiSuccess {String} user.username Unique Username of the User
   * @apiSuccess {String} user.name Not unique name of the User
   * @apiSuccess {String} user.avatar Profile Picture Url of the User
   * @apiSuccess {Boolean} user.isBot Is User a selfmade Bot?
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "error": false,
   *        "text": "New User added!",
   *       "basicInformation": {
   *         "avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/11348214_1481558242162220_192850898_a.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=B7-pbvVKmuUAX8eN6tC&oh=6a31cb46581f18fddc455b6143ef4461&oe=5EDBE1DB",
   *          "name": "flame",
   *          "username": "travisscott",
   *          "isBot": "false"
   *        }
   *      }
   *
   * @apiError UserAlreadyExists The User was already added
   * @apiError UserNotFound The User was not found
   * @apiError UserIsPrivate The User is private
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/user/new/:username").get(checkToken, newUser);
  /**
   * @api {post} /login
   * @apiName Login
   * @apiDescription Route to Login to the Website
   * @apiGroup Misc
   *
   * @apiParam (Body) {String} password Password for the Website
   *
   * @apiSuccess {Boolean} error Error happened?
   * @apiSuccess {String} token Bearer Auth token
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "error": false,
   *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773",
   *      }
   *
   * @apiError PasswordFalse The Password provided was false
   */
  app.route("/login").post(login);
  /**
   * @api {get} /user/delete/:username
   * @apiDescription Delete a User by Username
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Boolean} error Error happened?
   * @apiSuccess {String} text Text to descripe what happened
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "error": false,
   *        "text": "User deleted!",
   *      }
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/user/delete/:username").get(checkToken, deleteUser);
  /**
   * @api {get} /post/last-fifty-pictures/:username
   * @apiName LastFiftyPictures
   * @apiDescription Get The Last Fifty Pictures for a Username
   * @apiGroup Post
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {ImagePreview[]} images An Array of images
   * @apiSuccess {String} images.id The ig shortcode of the Image
   * @apiSuccess {String} images.er The Engagement Rate of the Image
   * @apiSuccess {String} images.caption The Description of the Image
   * @apiSuccess {Number} images.likes The Likes which the Image got
   * @apiSuccess {Number} images.comments The number of comments
   * @apiSuccess {String} images.author The name of the Author
   * @apiSuccess {String} images.avatarUrl The Profile picture of the Author
   * @apiSuccess {String} images.imageUrl The Url of the Image itself
   * @apiSuccess {Number} images.timeStamp The Timestamp when the image got posted
   * @apiSuccess {Boolean} images.isVideo Is the posted Content a Video?
   * @apiSuccess {Boolean} images.multipleViews Has the posted Content more than one view?
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      [
   *        {
   *          "id": "B_x3iB_naw8",
   *          "er": 4.833289682279117,
   *          "caption": "🎾 🤍🤍🤍 hi",
   *          "likes": 8339178,
   *          "comments": 54298,
   *          "author": "Kylie 🤍",
   *          "avatarUrl": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B",
   *          "imageUrl": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/95477677_542820166426139_3025352104743603900_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=yVP6ukfagT4AX_efQr2&oh=20249261f8f32a0d446c826b7ecaade8&oe=5ED92F3C",
   *          "timeStamp": 1588623726,
   *          "isVideo": false,
   *          "multipleViews": true
   *        }
   *      ]
   *
   *
   * @apiError RateLimitReached The Rate Limit of IG reached
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/post/last-fifty-pictures/:username")
    .get(checkToken, lastFiftyPictures);
  /**
   * @api {get} /post/details-for-pictures/:shortcode
   * @apiName DetailsForPicture
   * @apiDescription Get detailed Information about a specific Post
   * @apiGroup Post
   *
   * @apiParam {String} shortcode unique IG id of a picture
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {String} id The ig shortcode of the Image
   * @apiSuccess {String} er The Engagement Rate of the Image
   * @apiSuccess {String} caption The Description of the Image
   * @apiSuccess {Number} likes The Likes which the Image got
   * @apiSuccess {Tag[]} hashTags The hashtags which the user used in the caption
   * @apiSuccess {String} hashTags.name The name of the Hashtag
   * @apiSuccess {Number} hashTags.posts The number of posts with specific Hashtag
   * @apiSuccess {Number} comments The number of comments
   * @apiSuccess {BasicUserInformation} Owner the owner of the Image
   * @apiSuccess {String} owner.avatar The profile Picture of the owner
   * @apiSuccess {String} owner.name The name of the owner
   * @apiSuccess {String} owner.username The unique IG username of the owner
   * @apiSuccess {Comment[]} previewComments An Array of comments written under the post
   * @apiSuccess {Number} previewComments.likes Number of likes which the comment has
   * @apiSuccess {Number} previewComments.timeStamp Timestamp when the comment was posted
   * @apiSuccess {BasicUserInformation} previewComments.owner Owner of the comment
   * @apiSuccess {String} previewComments.text Content of the comment
   * @apiSuccess {Image[]} images Images related to the post
   * @apiSuccess {Boolean} images.isVideo Is Image a Video?
   * @apiSuccess {String} images.display_url The url of the image
   * @apiSuccess {BasicUserInformation[]} images.tagged_users The users who are tagged in the image
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *       "id": "B_x3iB_naw8",
   *        "er": 4.8616299010544815,
   *        "timeStamp": 1588623726,
   *        "hashTags": [{"name":"meme", "posts": 30000}],
   *        "caption": "🎾 🤍🤍🤍 hi #meme",
   *        "comments": 54738,
   *        "likes": 8388016,
   *        "owner": {
   *            "avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B",
   *            "name": "Kylie 🤍",
   *            "username": "kyliejenner"
   *         },
   *         "previewComments": [
   *           {
   *             "likes": 0,
   *             "timeStamp": 1588674430,
   *             "owner": {
   *               "avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/87854878_635204607046228_2637245967128068096_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=0h43tmD6zswAX9e2MAG&oh=e17f8aab91a7ad62a676784e1b299504&oe=5EDA0D39",
   *               "name": "",
   *               "username": "mrwnlqnwny"
   *             },
   *             "text": "اتمنا اتكون شريكت حياتي بجمالج انتي جميلة❤️💜💚💙💛🌹🌸🌷💐"
   *           },
   *         ],
   *         "images": [
   *           {
   *             "isVideo": false,
   *             "display_url": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/95477677_542820166426139_3025352104743603900_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=yVP6ukfagT4AX_efQr2&oh=20249261f8f32a0d446c826b7ecaade8&oe=5ED92F3C",
   *             "tagged_users": [{"avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/87854878_635204607046228_2637245967128068096_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=0h43tmD6zswAX9e2MAG&oh=e17f8aab91a7ad62a676784e1b299504&oe=5EDA0D39",
   *               "name": "asdfsadf",
   *               "username": "mrwnlqnwny"}]
   *           },
   *           {
   *             "isVideo": false,
   *             "display_url": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/96091948_117006173327752_9000982950821661011_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=c8uq6TQqrP0AX_GOvoz&oh=5634fb7868ebd2d8f0850ce6cd338b63&oe=5EDB30BE",
   *             "tagged_users": []
   *           },
   *           {
   *             "isVideo": false,
   *             "display_url": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/95561720_655710378553301_401467551532294014_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=lUXRZw4nmdYAX8zzd9v&oh=59106f3c179e6823688e1750225a678e&oe=5EDB0544",
   *             "tagged_users": []
   *           }
   *         ]
   *       }
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/post/details-for-pictures/:shortcode")
    .get(checkToken, detailsForPicture);
  /**
   * @api {get} /user/avg-price-for-ads/:username
   * @apiName AvgPriceForAds
   * @apiDescription Get the average Price for ads based on th Engagement Rate
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Number} min The minimum price for an Ad
   * @apiSuccess {Number} max The maximum price for an Ad
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "min": 10,
   *        "max": 20
   *      }
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/user/avg-price-for-ads/:username")
    .get(checkToken, avgPriceForAds);
  /**
   * @api {get} /user/avg-likes-and-comments/:username
   * @apiName AvgLikesAndComments
   * @apiDescription Get the average Likes and Comments of an User based on the last 50 Pictures
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Number} likes The average amount of likes
   * @apiSuccess {Number} comments The average amount of comments
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "likes": 10,
   *        "comments": 20
   *      }
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/user/avg-likes-and-comments/:username")
    .get(checkToken, avgCommentsAndLikes);
  /**
   * @api {get} /user/avg-engagementrate/:username
   * @apiName AvgEngagementRate
   * @apiDescription Get the average Engagement Rate of an User based on the last 50 Pictures
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Number} er The average Egagement Rate
   * @apiSuccess {Number} comments The average amount of comments
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "er": 4.5
   *      }
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/user/avg-engagementrate/:username")
    .get(checkToken, getAvgEngagementRate);
  /**
   * @api {get} /user/general-information/:username
   * @apiName GeneralInformation
   * @apiDescription Get the general Information about an User
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Number} id The id of the User
   * @apiSuccess {String} userName The Username of the User
   * @apiSuccess {Number} followers The number of followers the User has
   * @apiSuccess {String} igId The unique Instagram Id
   * @apiSuccess {String} cursor The Cursor for Instagram queries
   * @apiSuccess {Number} posts The number of posts a User has made
   * @apiSuccess {Number} following The number of Users the User follows
   * @apiSuccess {Number} avgLikes The average likes the User gets
   * @apiSuccess {Number} avgComments The average Comments the User gets
   * @apiSuccess {String} avgEngagementRate The average Engagement Rate the User gets
   * @apiSuccess {String} avgPriceMin The minimum price for Ads
   * @apiSuccess {String} avgPriceMax The maximum price for Ads
   * @apiSuccess {Boolean} isBot Is the User a Bot?
   * @apiSuccess {String} description The Caption of the User
   * @apiSuccess {String} avatar The Profile Picture Url
   * @apiSuccess {String} name The non unique name
   * @apiSuccess {String} createdAt When was the DB entry created
   * @apiSuccess {String} updatedAt When was the DB entry last updated
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "id": 4,
   *        "userName": "kyliejenner",
   *        "followers": 173661327,
   *         "igId": "12281817",
   *         "cursor": "QVFBb29RMjBTd3R2RWlYZGwzZ3lfQjB4VnFWZUtFN2t4X3BLSk85SE80UmhjWUhFTF91RnRMeGE0UGwyOHB6Z0MxZURfbER0dE5XZDFxWWRrVmpYOTcyVQ==",
   *         "posts": 6378,
   *         "following": 139,
   *         "avgLikes": 8536573,
   *         "avgComments": 59801,
   *         "avgEngagementRate": "4.95",
   *         "avgPriceMin": "972503.43",
   *         "avgPriceMax": "1276410.75",
   *         "isBot": false,
   *         "createdAt": "2020-05-03T11:14:00.000Z",
   *         "updatedAt": "2020-05-05T09:36:23.000Z",
   *         "description": "@kyliecosmetics @kylieskin",
   *         "avatar": "https://scontent-vie1-1.cdninstagram.com/v/t51.2885-19/s150x150/88969499_231226268049340_341618078066409472_n.jpg?_nc_ht=scontent-vie1-1.cdninstagram.com&_nc_ohc=VYhNq4OhlLIAX9GYc8v&oh=92c70c981fa914f296a637e474f79f52&oe=5EDB9F0B",
   *         "name": "Kylie 🤍"
   *      }
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/user/general-information/:username")
    .get(checkToken, generalInformation);
  /**
   * @api {get} /user/graph-data/:username
   * @apiName GraphData
   * @apiDescription Get the historic data for Engagement Rate, Likes and Comments
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {GraphData[]} graphs The different graphs
   * @apiSuccess {String} graphs.header The type of the Graph
   * @apiSuccess {chart[]} graphs.chart The data for the Graph
   * @apiSuccess {Number} graphs.chart.name Timestamp when the image was posted
   * @apiSuccess {Number} graphs.chart.data The value e.g. likes or comments
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      [
   *        {
   *        "header": "Engagement Rate",
   *        "chart": [
   *          {
   *            "name": 132123132,
   *            "data": 4.23
   *          },
   *          {
   *            "name": 132123132,
   *            "data": 4.23
   *          }
   *          ]
   *         },
   *         {
   *        "header": "Likes",
   *        "chart": [
   *                {
   *                  "name": 132123132,
   *                  "data": 12334
   *                },
   *                {
   *                  "name": 132123132,
   *                  "data": 123234
   *                }
   *              ]
   *         },
   *        {
   *        "header": "Comments",
   *        "chart": [
   *                {
   *                  "name": 132123132,
   *                  "data": 12334
   *                },
   *                {
   *                  "name": 132123132,
   *                  "data": 123234
   *                }
   *              ]
   *         }
   *      ]
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError RateLimitReached The Rate Limit of IG reached
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/user/graph-data/:username").get(checkToken, graphData);
  /**
   * @api {post} /post/er-for-post/:username
   * @apiName ErForPost
   * @apiDescription Get the Engagement Rate for a specific post
   * @apiGroup Post
   *
   * @apiParam (Body) {String} id Shortcode of the post
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Number} engagementRate The Engagement Rate For the specific Post
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "engagementRate": 4.34
   *      }
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/post/er-for-post/:username").post(checkToken, erForPost);
  /**
   * @api {get} /user/tags/:username
   * @apiName Tags
   * @apiDescription Get Tags with imagga for the images the User posts
   * @apiGroup User
   *
   * @apiParam {String} username Users unique IG Username
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Tag[]} tags The different tags
   * @apiSuccess {Number} tags.confidence The confidence level of the image recognition
   * @apiSuccess {Object} tags.tag One tag
   * @apiSuccess {String} tags.tag.en Name of the tag
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      [
   *          {
   *             "confidence": 100,
   *             "tag": {
   *                 "en": "racket"
   *             }
   *         },
   *         {
   *             "confidence": 100,
   *             "tag": {
   *                 "en": "sports implement"
   *             }
   *         },
   *         {
   *             "confidence": 100,
   *             "tag": {
   *                 "en": "bath towel"
   *             }
   *         },
   *         {
   *             "confidence": 100,
   *             "tag": {
   *                 "en": "bath linen"
   *             }
   *         },
   *         {
   *             "confidence": 100,
   *             "tag": {
   *                 "en": "towel"
   *             }
   *         }
   *     ]
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/user/tags/:username").get(checkToken, tags);
  /**
   * @api {get} /hashtag/posts-for-tag/:hashtag
   * @apiName PostsForTag
   * @apiDescription Get the number of posts under a Hashtag
   * @apiGroup Hashtag
   *
   * @apiParam {String} hashtag The Hashtag
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Number} posts The number of posts under the Hashtag
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      {
   *        "posts": 234214
   *      }
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app.route("/hashtag/posts-for-tag/:hashtag").get(checkToken, postsForTags);
  /**
   * @api {get} /post/rankings-for-picture/:shortcode
   * @apiName RankingsForPicture
   * @apiDescription Get the differnt ranks for a picture and how it compares in different categories to your other pictures
   * @apiGroup Post
   *
   * @apiParam {String} shortcode unique IG id of a picture
   *
   * @apiHeader (Response Headers) {String} Authorization Authorization Bearer token
   *
   *
   * @apiSuccess {Ranking[]} rankings The different rankings
   * @apiSuccess {Number} rankings.rank The rank which the picture has compared to others
   * @apiSuccess {Number} rankings.percentage The percentage shows how many pictures performed worse than this
   * @apiSuccess {String} rankings.type The Category in which the Picture gets compared
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *      [
   *         {
   *             "rank": 18,
   *             "percentage": 64,
   *             "type": "Likes"
   *         },
   *         {
   *             "rank": 21,
   *             "percentage": 58,
   *             "type": "Comments"
   *         },
   *         {
   *             "rank": 17,
   *             "percentage": 66,
   *             "type": "Engagement Rate"
   *         }
   *     ]
   *
   *
   * @apiError AuthTokenNotSupplied The Auth Token was not supplied
   * @apiError AuthTokenWrong The Auth token was wrong
   */
  app
    .route("/post/rankings-for-picture/:shortcode")
    .get(checkToken, rankingForPicture);
};

export default routes;
