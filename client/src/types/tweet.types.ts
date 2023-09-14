import { ObjectId } from 'mongoose';

export interface Like {
  userId: ObjectId;
}

export interface Tweet {
  _id: string;
  userId: ObjectId;
  text?: string;
  createdAt?: Date;
  likeCount?: number;
  likes?: Like[];
}
