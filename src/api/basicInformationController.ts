import e = require("express");
import { UserInformation } from "../service/UserInformation";
import UserRepository from "../repositories/userRepository";
import User from "../interfaces/User";
import BasicUserInformation from "../interfaces/BasicUserInformation";
//var properties = require("../../package.json");

export const basicInformation = async (req: e.Request, res: e.Response) => {
  const users = await UserRepository.getAllUsers() as User[]
    const userInformation = await UserInformation.InitAsync();
    let imagesrc;
    let name;
    let userData: BasicUserInformation[] = [];
    for(const user of users) {
      imagesrc = await userInformation.getProfilePicture(`https://www.instagram.com/${user.userName}/`)
       name = await userInformation.getName(`https://www.instagram.com/${user.userName}/`)
       userData.push({avatar: imagesrc, name, username: user.userName})
    }
    
      res.send(userData)
}