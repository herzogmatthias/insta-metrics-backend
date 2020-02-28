export interface PostRootData {
  graphql: Graphql;
}
export interface Graphql {
  shortcode_media: ShortcodeMedia;
}
export interface ShortcodeMedia {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  gating_info?: null;
  fact_check_overall_rating?: null;
  fact_check_information?: null;
  media_preview?: null;
  display_url: string;
  display_resources?: DisplayResourcesEntity[] | null;
  is_video: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser;
  edge_media_to_caption: EdgeMediaToCaption;
  caption_is_edited: boolean;
  has_ranked_comments: boolean;
  edge_media_to_parent_comment: EdgeMediaToParentComment;
  edge_media_to_hoisted_comment: EdgeMediaToTaggedUserOrEdgeMediaToHoistedCommentOrEdgeMediaToSponsorUserOrEdgeWebMediaToRelatedMedia;
  edge_media_preview_comment: EdgeMediaPreviewComment;
  comments_disabled: boolean;
  commenting_disabled_for_viewer: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreviewLike;
  edge_media_to_sponsor_user: EdgeMediaToTaggedUserOrEdgeMediaToHoistedCommentOrEdgeMediaToSponsorUserOrEdgeWebMediaToRelatedMedia;
  location?: null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  owner: Owner;
  is_ad: boolean;
  edge_web_media_to_related_media: EdgeMediaToTaggedUserOrEdgeMediaToHoistedCommentOrEdgeMediaToSponsorUserOrEdgeWebMediaToRelatedMedia;
  edge_sidecar_to_children: EdgeSidecarToChildren;
}
export interface Dimensions {
  height: number;
  width: number;
}
export interface DisplayResourcesEntity {
  src: string;
  config_width: number;
  config_height: number;
}
export interface EdgeMediaToTaggedUser {
  edges?: EdgesEntity[] | null;
}
export interface EdgesEntity {
  node: Node;
}
export interface Node {
  user: User;
  x: number;
  y: number;
}
export interface User {
  full_name: string;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
}
export interface EdgeMediaToCaption {
  edges?: EdgesEntity1[] | null;
}
export interface EdgesEntity1 {
  node: Node1;
}
export interface Node1 {
  text: string;
}
export interface EdgeMediaToParentComment {
  count: number;
  page_info: PageInfo;
  edges?: EdgesEntity2[] | null;
}
export interface PageInfo {
  has_next_page: boolean;
  end_cursor: string;
}
export interface EdgesEntity2 {
  node: Node2;
}
export interface Node2 {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: OwnerOrNode;
  viewer_has_liked: boolean;
  edge_liked_by: EdgeLikedBy;
  is_restricted_pending: boolean;
  edge_threaded_comments: EdgeThreadedComments;
}
export interface OwnerOrNode {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
}
export interface EdgeLikedBy {
  count: number;
}
export interface EdgeThreadedComments {
  count: number;
  page_info: PageInfo1;
  edges?: EdgesEntity3[] | null;
}
export interface PageInfo1 {
  has_next_page: boolean;
  end_cursor?: string | null;
}
export interface EdgesEntity3 {
  node: Node3;
}
export interface Node3 {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: OwnerOrNode;
  viewer_has_liked: boolean;
  edge_liked_by: EdgeLikedBy;
  is_restricted_pending: boolean;
}
export interface EdgeMediaToTaggedUserOrEdgeMediaToHoistedCommentOrEdgeMediaToSponsorUserOrEdgeWebMediaToRelatedMedia {
  edges?: null[] | null;
}
export interface EdgeMediaPreviewComment {
  count: number;
  edges?: EdgesEntity3[] | null;
}
export interface EdgeMediaPreviewLike {
  count: number;
  edges?: EdgesEntity4[] | null;
}
export interface EdgesEntity4 {
  node: OwnerOrNode;
}
export interface Owner {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
  blocked_by_viewer: boolean;
  restricted_by_viewer: boolean;
  followed_by_viewer: boolean;
  full_name: string;
  has_blocked_viewer: boolean;
  is_private: boolean;
  is_unpublished: boolean;
  requested_by_viewer: boolean;
}
export interface EdgeSidecarToChildren {
  edges?: EdgesEntity5[] | null;
}
export interface EdgesEntity5 {
  node: Node4;
}
export interface Node4 {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  gating_info?: null;
  fact_check_overall_rating?: null;
  fact_check_information?: null;
  media_preview: string;
  display_url: string;
  display_resources?: DisplayResourcesEntity[] | null;
  accessibility_caption: string;
  is_video: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser1;
}
export interface EdgeMediaToTaggedUser1 {
  edges?: (EdgesEntity6 | null)[] | null;
}
export interface EdgesEntity6 {
  node: Node;
}
