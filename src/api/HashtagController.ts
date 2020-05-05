import e = require("express");
import HashtagService from "../services/HashtagService";
import { Instagram_Url, Instagram_Api_Param } from "../config";

export const postsForTags = async (req: e.Request, res: e.Response) => {
  const hashtag = req.params.hashtag as string;
  const hashtagService = new HashtagService();
  const posts: number = await hashtagService.getPostsForTags(
    `${Instagram_Url}explore/tags/${hashtag}/${Instagram_Api_Param}`
  );
  res.json({ posts: posts });
};
