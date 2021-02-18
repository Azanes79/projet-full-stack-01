import { User } from "./user";

export class Post {
   _id: string;
   Content: string;
   CreatedAt: Date;
   FirebaseId: string;
   isLike: boolean;
   user: User


   constructor(Content: string, CreatedAt: Date, FirebaseId: string, Id?: string) {
      this.Content = Content;
      this.CreatedAt = CreatedAt;
      this.FirebaseId = FirebaseId;
      this._id = Id;
      this.isLike = false;
   }
}