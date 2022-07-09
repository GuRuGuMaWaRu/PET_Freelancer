import type { Document, ObjectId } from "mongoose";
import { Request } from "express";

export interface IClient extends Document {
  user: ObjectId;
  name: string;
  deleted: boolean;
}

export interface IProject extends Document {
  user: ObjectId;
  client: ObjectId;
  projectNr: string;
  payment: number;
  currency: string;
  date: Date;
  deleted: boolean;
  paid: boolean;
  comments: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  password: string;
  deleted: boolean;
  comparePasswords: (password1: string, password2: string) => boolean;
}

export interface IPayload {
  id: string;
}

export interface IRequestWithUserId extends Request {
  userId: string;
}