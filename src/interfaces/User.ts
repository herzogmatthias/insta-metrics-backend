export default interface User {
  id?: number;
  userName: string;
  posts: number;
  followers: number;
  following: number;
  avgLikes: number;
  avgComments: number;
  avgEngagementRate: number;
  avgPriceMin: number;
  avgPriceMax: number;
  cursor: string;
  igId: string;
  isBot: boolean;
}
