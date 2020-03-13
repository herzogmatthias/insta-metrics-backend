import e = require("express");
import UserRepository from "../repositories/userRepository";
import { checkUserName } from "../service/checkUsername";
import Error from "../interfaces/Error";
import { UserInformation } from "../service/UserInformation";
import User from "../interfaces/User";
import BasicUserInformation from "../interfaces/BasicUserInformation";
import AdvancedInformation from "../service/AdvancedInformation";

export const newUser = async (req: e.Request, res: e.Response) => {
  const URI = `https://www.instagram.com/${req.params.username}/`;
  const validUsername = await checkUserName(req.params.username);
  if (!validUsername) {
    res
      .status(400)
      .json({ text: "Username does not exist", error: true } as Error);
    return;
  }
  const users = (await UserRepository.getAllUsers()) as any[];
  if (users.find(v => v.userName === req.params.username)) {
    res
      .status(400)
      .json({ text: "Username already exists", error: true } as Error);
    return;
  }
  const ui = new UserInformation();
  const basicStats = await ui.getBasicStats(URI);
  const avgStats = await AdvancedInformation.getAvgCommentsAndLikes(URI);
  const avgER = await AdvancedInformation.getAvgEngagementRate(
    URI,
    basicStats.followers
  );
  console.log(avgER);
  const avgAdPrice = await AdvancedInformation.getAvgPriceForAds(
    URI,
    avgER,
    basicStats.followers
  );
  let user: User = {
    userName: req.params.username,
    followers: basicStats.followers,
    following: basicStats.following,
    posts: basicStats.posts,
    password: "",
    avgComments: avgStats.comments,
    avgLikes: avgStats.likes,
    avgEngagementRate: avgER,
    avgPriceMin: avgAdPrice.min,
    avgPriceMax: avgAdPrice.max
  };
  console.log(user);
  UserRepository.addUser(user);
  const basicInformation: BasicUserInformation = await ui.getBasicInformation(
    URI + "?__a=1"
  );
  res.json({ error: false, text: "New User added!", basicInformation });
};

export const deleteUser = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  UserRepository.deleteUser(username);
  res.json({ error: false, text: "User deleted!" });
};
