import e from "express";
import PostService from "../services/PostService";

export const lastFiftyPictures = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const postService = new PostService();
  const images = await postService.getLastFiftyPictures(username);
  res.json(images);
};
export const detailsForPicture = async (req: e.Request, res: e.Response) => {
  const shortCode = req.params.shortcode as string;
  const postService = new PostService();
  const image = await postService.getDetailsForPicture(shortCode);
  res.json(image);
};

export const erForPost = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const id = req.body.id as string;
  const postService = new PostService();
  const er = await postService.getErForPost(username, id);
  res.json({ engagementRate: er });
};

export const rankingForPicture = async (req: e.Request, res: e.Response) => {
  const shortCode = req.params.shortcode;
  const postService = new PostService();
  const rankings = await postService.getRankingsForPost(shortCode);
  res.json(rankings);
};
