export interface InstagramData {
  graphql: ShortCodeMedia;
}

interface ShortCodeMedia {
  shortcode_media: InstaNode;
}
interface InstaNode {
  is_video: boolean;
  edge_media_preview_comment: CommentData;
  edge_media_preview_like: LikeData;
  commments_disabled: boolean;
}

interface CommentData {
  count: number;
}

interface LikeData {
  count: number;
}
interface TimeLineMedia {
  count: number;
  edges: InstaNode[];
}
