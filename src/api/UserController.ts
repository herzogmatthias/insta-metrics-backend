import e = require("express");
import UserRepository from "../repositories/userRepository";
import { checkUserName } from "../services/checkUsername";
import Error from "../interfaces/Error";
import User from "../interfaces/User";
import { Instagram_Api_Param, Instagram_Url } from "../config";
import BasicUserInformation from "../interfaces/BasicUserInformation";
import UserService from "../services/UserService";
import PostService from "../services/PostService";

export const newUser = async (req: e.Request, res: e.Response) => {
  const postService = new PostService();
  const URI = `${Instagram_Url}${req.params.username}/${Instagram_Api_Param}`;
  const validUsername = await checkUserName(req.params.username);
  if (!validUsername) {
    res
      .status(400)
      .json({ text: "Username does not exist", error: true } as Error);
    return;
  }
  const users = (await UserRepository.getAllUsers()) as any[];
  if (users.find((v) => v.userName === req.params.username)) {
    res
      .status(400)
      .json({ text: "Username already exists", error: true } as Error);
    return;
  }
  const userService = new UserService();
  const basicStats = await userService.getBasicStats(URI);
  const [id, cursor] = await userService.getIgIdandCursor(URI);
  const avgStats = await postService.getAvgCommentsAndLikes(URI);
  const avgER = await postService.getAvgEngagementRate(
    URI,
    basicStats.followers
  );
  console.log(avgER);
  const avgAdPrice = await postService.getAvgPriceForAds(
    URI,
    avgER,
    basicStats.followers
  );
  let user: User = {
    userName: req.params.username,
    followers: basicStats.followers,
    following: basicStats.following,
    posts: basicStats.posts,
    cursor: cursor!,
    igId: id!,
    avgComments: avgStats.comments,
    avgLikes: avgStats.likes,
    avgEngagementRate: avgER,
    avgPriceMin: avgAdPrice.min,
    avgPriceMax: avgAdPrice.max,
  };
  console.log(user);
  const basicInformation = await userService.getBasicInformation(URI);
  UserRepository.addUser(user);
  res.json({ error: false, text: "New User added!", basicInformation });
};

export const deleteUser = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  UserRepository.deleteUser(username);
  res.json({ error: false, text: "User deleted!" });
};
export const basicInformation = async (req: e.Request, res: e.Response) => {
  const users = (await UserRepository.getAllUsers()) as User[];
  const userService = new UserService();
  let userData: BasicUserInformation[] = [];
  for (const user of users) {
    const userInfo: BasicUserInformation = await userService.getBasicInformation(
      `${Instagram_Url}${user.userName}/${Instagram_Api_Param}`
    );

    userData.push(userInfo);
  }
  res.send(userData);
};
export const tags = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  const userService = new UserService();
  const tags = await userService.getTags(
    `https://www.instagram.com/${username}/?__a=1`
  );
  res.status(200).json(tags);
};
export const avgPriceForAds = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  const URI = `${Instagram_Url}${username}/`;
  const postService = new PostService();
  const prices = await postService.getAvgPriceForAds(URI);
  res.json(prices);
};
export const getAvgEngagementRate = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const postService = new PostService();
  const avgStats = await postService.getAvgEngagementRate(
    `${Instagram_Url}${username}/`
  );
  res.json(avgStats);
};
