import { Request } from "express";

export interface IPayload {
  id: string;
}

export interface IRequestWithUserId extends Request {
  userId: string;
}
