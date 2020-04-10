export default interface User {
  id?: number;
  userName: string;
  posts: number;
  followers: number;
  following: number;
  avgLikes: number;
  avgComments: number;
  password: string;
  avgEngagementRate: number;
  avgPriceMin: number;
  avgPriceMax: number;
  cursor: string;
  igId: string;
}
