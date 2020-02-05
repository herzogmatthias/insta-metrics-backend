import e = require("express");
import { UserInformation } from "../service/UserInformation";
import AdvancedInformation from "../service/AdvancedInformation";
//var properties = require("../../package.json");

export const basicInformation = async (req: e.Request, res: e.Response) => {
    const userInformation = await UserInformation.InitAsync();
    const advancedInformation = await AdvancedInformation.InitAsync();
    const imagesrc = await userInformation.getProfilePicture('https://www.instagram.com/farokh_police/')
    const name = await userInformation.getName('https://www.instagram.com/farokh_police/')
    await advancedInformation.getLikes('https://www.instagram.com/farokh_police/')
      res.send({imagesrc, name})
}