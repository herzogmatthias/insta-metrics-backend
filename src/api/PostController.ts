import e from "express";
import { Instagram_Url } from "../config";
import PostService from "../services/PostService";

export const getAvgCommentsAndLikes = async (
  req: e.Request,
  res: e.Response
) => {
  const username = req.params.username as string;
  const postService = new PostService();
  const avgStats = await postService.getAvgCommentsAndLikes(
    `${Instagram_Url}${username}/`
  );
  res.json(avgStats);
};
export const getLastFiftyPictures = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const postService = new PostService();
  const images = await postService.getLastFiftyPictures(username);
  res.json(images);
};
export const getDetailsForPicture = async (req: e.Request, res: e.Response) => {
  const shortCode = req.params.shortcode as string;
  const postService = new PostService();
  const image = await postService.getDetailsForPicture(shortCode);
  console.log(image);
  res.json(image);
};

export const getErForPost = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const id = req.body.id as string;
  const postService = new PostService();
  const er = await postService.getErForPost(username, id);
  res.json({ engagementRate: er });
};
