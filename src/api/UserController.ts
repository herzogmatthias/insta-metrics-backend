import e = require("express");
import UserRepository from "../repositories/userRepository";
import { checkUserName } from "../service/checkUsername";
import Error from "../interfaces/Error";
import { UserInformation } from "../service/UserInformation";
import User from "../interfaces/User";
import BasicUserInformation from "../interfaces/BasicUserInformation";

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
  const ui = await UserInformation.InitAsync();
  const basicStats = await ui.getBasicStats(URI);
  let user: User = {
    userName: req.params.username,
    followers: basicStats.get("followers") || basicStats.get("follower")!,
    following: basicStats.get("following")!,
    posts: basicStats.get("posts") || basicStats.get("post")!
  };
  UserRepository.addUser(user);
  const basicInformation: BasicUserInformation = {
    username: req.params.username,
    avatar: await ui.getProfilePicture(URI),
    name: await ui.getName(URI)
  };
  res.json({ error: false, text: "New User added!", basicInformation });
};

export const deleteUser = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  UserRepository.deleteUser(username);
  res.json({ error: false, text: "User deleted!" });
};
