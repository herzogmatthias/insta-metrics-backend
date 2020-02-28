export interface UserRootData {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: Graphql;
  toast_content_on_load?: null;
}
export interface Graphql {
  user: User;
}
export interface User {
  biography: string;
  blocked_by_viewer: boolean;
  restricted_by_viewer: boolean;
  country_block: boolean;
  external_url: string;
  external_url_linkshimmed: string;
  edge_followed_by: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  followed_by_viewer: boolean;
  edge_follow: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  follows_viewer: boolean;
  full_name: string;
  has_ar_effects: boolean;
  has_channel: boolean;
  has_blocked_viewer: boolean;
  highlight_reel_count: number;
  has_requested_viewer: boolean;
  id: string;
  is_business_account: boolean;
  is_joined_recently: boolean;
  business_category_name?: null;
  category_id?: null;
  overall_category_name?: null;
  is_private: boolean;
  is_verified: boolean;
  edge_mutual_followed_by: EdgeMutualFollowedBy;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  username: string;
  connected_fb_page?: null;
  edge_felix_video_timeline: EdgeFelixVideoTimeline;
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
  edge_saved_media: EdgeSavedMediaOrEdgeMediaCollections;
  edge_media_collections: EdgeSavedMediaOrEdgeMediaCollections;
}
export interface EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow {
  count: number;
}
export interface EdgeMutualFollowedBy {
  count: number;
  edges?: EdgesEntity[] | null;
}
export interface EdgesEntity {
  node: Node;
}
export interface Node {
  username: string;
}
export interface EdgeFelixVideoTimeline {
  count: number;
  page_info: PageInfo;
  edges?: EdgesEntity1[] | null;
}
export interface PageInfo {
  has_next_page: boolean;
  end_cursor?: null;
}
export interface EdgesEntity1 {
  node: Node1;
}
export interface Node1 {
  __typename: string;
  id: string;
  edge_media_to_caption: EdgeMediaToCaption;
  shortcode: string;
  edge_media_to_comment: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  dimensions: Dimensions;
  display_url: string;
  edge_liked_by: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  edge_media_preview_like: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  location?: null;
  gating_info?: null;
  fact_check_overall_rating?: null;
  fact_check_information?: null;
  media_preview?: string | null;
  owner: Owner;
  thumbnail_src: string;
  thumbnail_resources?: ThumbnailResourcesEntity[] | null;
  is_video: boolean;
  felix_profile_grid_crop?: null;
  encoding_status?: null;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  video_view_count: number;
}
export interface EdgeMediaToCaption {
  edges?: EdgesEntity2[] | null;
}
export interface EdgesEntity2 {
  node: Node2;
}
export interface Node2 {
  text: string;
}
export interface Dimensions {
  height: number;
  width: number;
}
export interface Owner {
  id: string;
  username: string;
}
export interface ThumbnailResourcesEntity {
  src: string;
  config_width: number;
  config_height: number;
}
export interface EdgeOwnerToTimelineMedia {
  count: number;
  page_info: PageInfo1;
  edges?: EdgesEntity3[] | null;
}
export interface PageInfo1 {
  has_next_page: boolean;
  end_cursor: string;
}
export interface EdgesEntity3 {
  node: Node3;
}
export interface Node3 {
  __typename: string;
  id: string;
  edge_media_to_caption: EdgeMediaToCaption;
  shortcode: string;
  edge_media_to_comment: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  dimensions: Dimensions;
  display_url: string;
  edge_liked_by: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  edge_media_preview_like: EdgeMediaToCommentOrEdgeLikedByOrEdgeMediaPreviewLikeOrEdgeFollowedByOrEdgeFollow;
  location?: null;
  gating_info?: null;
  fact_check_overall_rating?: null;
  fact_check_information?: null;
  media_preview?: string | null;
  owner: Owner;
  thumbnail_src: string;
  thumbnail_resources?: ThumbnailResourcesEntity[] | null;
  is_video: boolean;
  accessibility_caption?: string | null;
  felix_profile_grid_crop?: null;
  video_view_count?: number | null;
}
export interface EdgeSavedMediaOrEdgeMediaCollections {
  count: number;
  page_info: PageInfo;
  edges?: null[] | null;
}
