export interface MultiplePostsRootData {
  data: Data;
  status: string;
}

export interface Data {
  user: User;
}

export interface User {
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
}

export interface EdgeOwnerToTimelineMedia {
  count: number;
  page_info: PageInfo;
  edges: Edge[];
}

export interface PageInfo {
  has_next_page: boolean;
  end_cursor: string;
}

export interface Edge {
  node: Node;
}

export interface Node {
  __typename: string;
  id: string;
  dimensions: Dimensions;
  display_url: string;
  display_resources: DisplayResource[];
  is_video: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser;
  accessibility_caption: any;
  edge_media_to_caption: EdgeMediaToCaption;
  shortcode: string;
  edge_media_to_comment: EdgeMediaToComment;
  edge_media_to_sponsor_user: EdgeMediaToSponsorUser;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: EdgeMediaPreviewLike;
  gating_info: any;
  fact_check_overall_rating: any;
  fact_check_information: any;
  media_preview?: string;
  owner: Owner2;
  location: any;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  thumbnail_src: string;
  thumbnail_resources: ThumbnailResource[];
  dash_info?: DashInfo;
  video_url?: string;
  video_view_count?: number;
  edge_sidecar_to_children?: EdgeSidecarToChildren;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface DisplayResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface EdgeMediaToTaggedUser {
  edges: Edge2[];
}

export interface Edge2 {
  node: Node2;
}

export interface Node2 {
  user: User2;
  x: number;
  y: number;
}

export interface User2 {
  full_name: string;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
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
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: Owner;
  viewer_has_liked: boolean;
}

export interface Owner {
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
}

export interface EdgeMediaToSponsorUser {
  edges: any[];
}

export interface EdgeMediaPreviewLike {
  count: number;
  edges: Edge5[];
}

export interface Edge5 {
  node: Node5;
}

export interface Node5 {
  id: string;
  profile_pic_url: string;
  username: string;
}

export interface Owner2 {
  id: string;
  username: string;
}

export interface ThumbnailResource {
  src: string;
  config_width: number;
  config_height: number;
}

export interface DashInfo {
  is_dash_eligible: boolean;
  video_dash_manifest: string;
  number_of_qualities: number;
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
  dimensions: Dimensions2;
  display_url: string;
  display_resources: DisplayResource2[];
  is_video: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: EdgeMediaToTaggedUser2;
  accessibility_caption: any;
  dash_info?: DashInfo2;
  video_url?: string;
  video_view_count?: number;
}

export interface Dimensions2 {
  height: number;
  width: number;
}

export interface DisplayResource2 {
  src: string;
  config_width: number;
  config_height: number;
}

export interface EdgeMediaToTaggedUser2 {
  edges: Edge7[];
}

export interface Edge7 {
  node: Node7;
}

export interface Node7 {
  user: User3;
  x: number;
  y: number;
}

export interface User3 {
  full_name: string;
  id: string;
  is_verified: boolean;
  profile_pic_url: string;
  username: string;
}

export interface DashInfo2 {
  is_dash_eligible: boolean;
  video_dash_manifest: string;
  number_of_qualities: number;
}
