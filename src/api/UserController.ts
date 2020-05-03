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
  const isBot = req.query.isBot as boolean;
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
  const user = await userService.getUserData(req.params.username, URI, isBot);
  console.log(user);
  const basicInformation = await userService.getBasicInformation(URI, isBot);
  UserRepository.addUser(user);
  res.json({ error: false, text: "New User added!", basicInformation });
};
export const avgCommentsAndLikes = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const userService = new UserService();
  const avgStats = await userService.getAvgCommentsAndLikes(
    `${Instagram_Url}${username}/`
  );
  res.json(avgStats);
};
export const generalInformation = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const userService = new UserService();
  const user = await userService.getGeneralInformation(username);
  res.json(user);
};

export const graphData = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const userService = new UserService();
  const graphData = await userService.getGraphData(username);
  res.json(graphData);
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
  let error = false;
  for (const user of users) {
    userService
      .getUserData(
        user.userName,
        `${Instagram_Url}${user.userName}/${Instagram_Api_Param}`,
        false
      )
      .then((val) => {
        UserRepository.updateUser(val);
      });
    const userInfo:
      | BasicUserInformation
      | Error = await userService.getBasicInformation(
      `${Instagram_Url}${user.userName}/${Instagram_Api_Param}`
    );
    if ((userInfo as Error).text) {
      res.status(500).send(userInfo);
      error = true;
      break;
    } else {
      userData.push(userInfo as BasicUserInformation);
    }
  }
  if (!error) {
    res.send(userData);
  }
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
