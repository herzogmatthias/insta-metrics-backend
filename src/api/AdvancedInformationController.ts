import e from "express";
import AdvancedInformation from "../service/AdvancedInformation";

export const getCommentsandLikesXPosts = async (
  req: e.Request,
  res: e.Response
) => {
  const username = req.params.username as string;
  const maxPictures = req.body.maxPictures as number;

  const ai = await AdvancedInformation.InitAsync();

  const pictureStats = await ai.getCommentsandLikesXPosts(
    `https://www.instagram.com/${username}/`,
    maxPictures
  );
  ai.stopBrowser();
  res.json(pictureStats);
};
export const getAvgCommentsAndLikes = async (
  req: e.Request,
  res: e.Response
) => {
  const username = req.params.username as string;

  const avgStats = await AdvancedInformation.getAvgCommentsAndLikes(
    `https://www.instagram.com/${username}/`
  );
  res.json(avgStats);
};
export const getAvgEngagementRate = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;

  const avgStats = await AdvancedInformation.getAvgEngagementRate(
    `https://www.instagram.com/${username}/`
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
  const URI = `https://www.instagram.com/${username}/`;
  const prices = await AdvancedInformation.getAvgPriceForAds(URI);
  res.json(prices);
};
