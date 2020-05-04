import fetch from "node-fetch";
import { Instagram_Url, Instagram_Api_Param } from "../config";
import { UserRootData } from "../interfaces/InstagramUserData";

export const checkUserName = async (username: string) => {
  const url = `${Instagram_Url}${username}/${Instagram_Api_Param}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    return { type: "Username does not exist", success: false };
  }
  const data = (await response.json()) as UserRootData;
  if (data.graphql.user.is_private) {
    return { type: "User is private", success: false };
  }
  return { type: "success", success: true };
};
