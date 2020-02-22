import e = require("express");
import { UserInformation } from "../service/UserInformation";
import UserRepository from "../repositories/userRepository";
import User from "../interfaces/User";
import BasicUserInformation from "../interfaces/BasicUserInformation";
import AdvancedInformation from "../service/AdvancedInformation";

export const basicInformation = async (req: e.Request, res: e.Response) => {
  const users = (await UserRepository.getAllUsers()) as User[];
  const userInformation = await UserInformation.InitAsync();
  let imagesrc;
  let name;
  let userData: BasicUserInformation[] = [];
  for (const user of users) {
    imagesrc = await userInformation.getProfilePicture(
      `https://www.instagram.com/${user.userName}/`
    );
    name = await userInformation.getName(
      `https://www.instagram.com/${user.userName}/`
    );
    userData.push({ avatar: imagesrc, name, username: user.userName });
  }
  userInformation.stopBrowser();
  res.send(userData);
};

export const lastThreePosts = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  const ui = await UserInformation.InitAsync();
  const embedHTML = await ui.getLastThreePosts(
    `https://www.instagram.com/${username}/`
  );
  ui.stopBrowser();
  res.json(embedHTML);
};

export const pricePerPost = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  const ai = await AdvancedInformation.InitAsync();
  const prices = await ai.getPriceForPost(username);
  res.json(prices);
};
