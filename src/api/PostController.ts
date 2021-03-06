import e from "express";
import PostService from "../services/PostService";
import { ImagePreview } from "../interfaces/Image";

export const lastFiftyPictures = async (req: e.Request, res: e.Response) => {
  const username = req.params.username as string;
  const postService = new PostService();
  let images = [];
  try {
    images = await postService.getLastFiftyPictures(username);
    images = images as ImagePreview[];
    images.sort((a, b) => b.timeStamp - a.timeStamp);
    res.json(images);
  } catch (e) {
    res.status(500).send({ name: e.name, stack: e.stack, message: e.message });
  }
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
