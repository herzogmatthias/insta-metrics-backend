export interface ImageDetails {
  owner: BasicUserInformation;
  id: string;
  likes: number;
  er: number;
  comments: number;
  caption: string;
  previewComments: Comment[];
  hashTags: string[];
  images: Image[];
}
export interface Comment {
  timeStamp: number;
  owner: BasicUserInformation;
  text: string;
  likes: number;
}
export interface Image {
  isVideo: boolean;
  display_url: string;
  tagged_users: BasicUserInformation[];
}
export interface BasicUserInformation {
  username: string;
  name: string;
  avatar: string;
}
export interface ImagePreview {
  id: string;
  likes: number;
  comments: number;
  caption: string;
  timeStamp: number;
  er: number;
  imageUrl: string;
  avatarUrl: string;
  author: string;
  isVideo: boolean;
  multipleViews: boolean;
}
