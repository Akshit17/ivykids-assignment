import { ObjectId } from 'mongoose';

export interface Like {
  userId: ObjectId;
}

export interface TweetType {
  _id: string;
  userId: ObjectId;
  text?: string;
  createdAt?: Date;
  likeCount?: number;
  likes?: Like[];
}
