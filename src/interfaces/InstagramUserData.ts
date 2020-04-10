export interface UserRootData {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: Graphql;
  toast_content_on_load: any;
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
  edge_followed_by: EdgeFollowedBy;
  followed_by_viewer: boolean;
  edge_follow: EdgeFollow;
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
  business_category_name: any;
  category_id: any;
  overall_category_name: any;
  is_private: boolean;
  is_verified: boolean;
  edge_mutual_followed_by: EdgeMutualFollowedBy;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  username: string;
  connected_fb_page: any;
  edge_felix_video_timeline: EdgeFelixVideoTimeline;
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
  edge_saved_media: EdgeSavedMedia;
  edge_media_collections: EdgeMediaCollections;
}

export interface EdgeFollowedBy {
  count: number;
}

export interface EdgeFollow {
  count: number;
}

export interface EdgeMutualFollowedBy {
  count: number;
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  username: string;
}

export interface EdgeFelixVideoTimeline {
  count: number;
  page_info: PageInfo;
  edges: Edge2[];
}

export interface PageInfo {
  has_next_page: boolean;
  end_cursor: any;
}

export interface Edge2 {
  node: Node2;
}

export interface Node2 {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions;
  display_url: string;
  gating_info: any;
  fact_check_overall_rating: any;
  fact_check_information: any;
  media_preview?: string;
  owner: Owner;
  is_video: boolean;
  accessibility_caption: any;
  edge_media_to_caption: EdgeMediaToCaption;
  edge_media_to_comment: EdgeMediaToComment;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: EdgeLikedBy;
  edge_media_preview_like: EdgeMediaPreviewLike;
  location: any;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource[];
  felix_profile_grid_crop: any;
  encoding_status: any;
  is_published: boolean;
  product_type: string;
  title: string;
  video_duration: number;
  video_view_count: number;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Owner {
  id: string;
  username: string;
}

export interface EdgeMediaToCaption {
  edges: Edge3[];
}

export interface Edge3 {
  node: Node3;
}

export interface Node3 {
  text: string;
}

export interface EdgeMediaToComment {
  count: number;
}

export interface EdgeLikedBy {
  count: number;
}

export interface EdgeMediaPreviewLike {
  count: number;
}

export interface ThumbnailResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface EdgeOwnerToTimelineMedia {
  count: number;
  page_info: PageInfo2;
  edges: Edge4[];
}

export interface PageInfo2 {
  has_next_page: boolean;
  end_cursor: string;
}

export interface Edge4 {
  node: Node4;
}

export interface Node4 {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions2;
  display_url: string;
  gating_info: any;
  fact_check_overall_rating: any;
  fact_check_information: any;
  media_preview?: string;
  owner: Owner2;
  is_video: boolean;
  accessibility_caption?: string;
  edge_media_to_caption: EdgeMediaToCaption2;
  edge_media_to_comment: EdgeMediaToComment2;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: EdgeLikedBy2;
  edge_media_preview_like: EdgeMediaPreviewLike2;
  location: any;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource2[];
  felix_profile_grid_crop: any;
  video_view_count?: number;
  edge_sidecar_to_children?: EdgeSidecarToChildren;
}

export interface Dimensions2 {
  height: number;
  width: number;
}

export interface Owner2 {
  id: string;
  username: string;
}

export interface EdgeMediaToCaption2 {
  edges: Edge5[];
}

export interface Edge5 {
  node: Node5;
}

export interface Node5 {
  text: string;
}

export interface EdgeMediaToComment2 {
  count: number;
}

export interface EdgeLikedBy2 {
  count: number;
}

export interface EdgeMediaPreviewLike2 {
  count: number;
}

export interface ThumbnailResource2 {
  src: string;
  config_width: number;
  config_height: number;
}

export interface EdgeSidecarToChildren {
  edges: Edge6[];
}

export interface Edge6 {
  node: Node6;
}

export interface Node6 {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: Dimensions3;
  display_url: string;
  gating_info: any;
  fact_check_overall_rating: any;
  fact_check_information: any;
  media_preview: string;
  owner: Owner3;
  is_video: boolean;
  accessibility_caption?: string;
}

export interface Dimensions3 {
  height: number;
  width: number;
}

export interface Owner3 {
  id: string;
  username: string;
}

export interface EdgeSavedMedia {
  count: number;
  page_info: PageInfo3;
  edges: any[];
}

export interface PageInfo3 {
  has_next_page: boolean;
  end_cursor: any;
}

export interface EdgeMediaCollections {
  count: number;
  page_info: PageInfo4;
  edges: any[];
}

export interface PageInfo4 {
  has_next_page: boolean;
  end_cursor: any;
}
