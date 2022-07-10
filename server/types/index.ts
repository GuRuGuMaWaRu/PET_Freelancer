import { Types } from "mongoose";
import { Request } from "express";

export interface IPayload {
  id: Types.ObjectId;
}

export interface IRequestWithUserId extends Request {
  userId: string;
}
