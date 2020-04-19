import { HashtagsData } from "../interfaces/InstagramHashtags";

export default class HashtagService {
  async getPostsForTags(url: string) {
    const posts = ((await (await fetch(url)).json()) as HashtagsData).graphql
      .hashtag.edge_hashtag_to_media.count;
    return posts;
  }
}
