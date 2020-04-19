import fetch from "node-fetch";
import { Instagram_Url, Instagram_Api_Param } from "../config";

export const checkUserName = async (username: string) => {
  const url = `${Instagram_Url}${username}/${Instagram_Api_Param}`;
  const data = await fetch(url);
  return data.status === 200 ? true : false;
};
