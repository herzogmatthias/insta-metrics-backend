import e from "express";
import AdvancedInformation from "../service/AdvancedInformation";

export const getCommentsandLikesXPictures = async (
  req: e.Request,
  res: e.Response
) => {
  const username = req.params.username as string;
  const maxPictures = req.body.maxPictures as number;

  const ai = await AdvancedInformation.InitAsync();

  const pictureStats = await ai.getCommentsandLikesXPictures(
    `https://www.instagram.com/${username}/`,
    maxPictures
  );
  res.json(pictureStats);
};
