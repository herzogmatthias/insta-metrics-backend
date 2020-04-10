import e = require("express");
import { UserInformation } from "../service/UserInformation";
import UserRepository from "../repositories/userRepository";
import User from "../interfaces/User";
import BasicUserInformation from "../interfaces/BasicUserInformation";

export const basicInformation = async (req: e.Request, res: e.Response) => {
  const users = (await UserRepository.getAllUsers()) as User[];
  const userInformation = new UserInformation();
  let userData: BasicUserInformation[] = [];
  for (const user of users) {
    const userInfo: BasicUserInformation = await userInformation.getBasicInformation(
      `https://www.instagram.com/${user.userName}/?__a=1`
    );

    userData.push(userInfo);
  }
  res.send(userData);
};

export const tags = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  const ui = new UserInformation();
  const tags = await ui.getTags(`https://www.instagram.com/${username}/?__a=1`);
  res.status(200).json(tags);
};
