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

export const getErForPost = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const id = req.body.id as string;
  const ai = await AdvancedInformation.InitAsync();
  const er = await ai.getErForPost(username, id);
  ai.stopBrowser();
  res.json({ engagementRate: er });
};
