import e from "express";
import AdvancedInformation from "../service/AdvancedInformation";
import { Instagram_Url } from "../config";

export const getLastFiftyPictures = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const images = await AdvancedInformation.getLastFiftyPictures(username);
  res.json(images);
};
export const getDetailsForPicture = async (req: e.Request, res: e.Response) => {
  const shortCode = req.params.shortcode as string;
  const image = await AdvancedInformation.getDetailsForPicture(shortCode);
  console.log(image);
  res.json(image);
};
export const getAvgCommentsAndLikes = async (
  req: e.Request,
  res: e.Response
) => {
  const username = req.params.username as string;

  const avgStats = await AdvancedInformation.getAvgCommentsAndLikes(
    `${Instagram_Url}${username}/`
  );
  res.json(avgStats);
};
export const getAvgEngagementRate = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;

  const avgStats = await AdvancedInformation.getAvgEngagementRate(
    `${Instagram_Url}${username}/`
  );
  res.json(avgStats);
};

export const getErForPost = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const id = req.body.id as string;
  const er = await AdvancedInformation.getErForPost(username, id);
  res.json({ engagementRate: er });
};
export const avgPriceForAds = async (req: e.Request, res: e.Response) => {
  const username = req.params.username;
  const URI = `${Instagram_Url}${username}/`;
  const prices = await AdvancedInformation.getAvgPriceForAds(URI);
  res.json(prices);
};
