import { Types } from "mongoose";
import { Request } from "express";

import type { IUser } from '../resources/user/user.model';
import type { IProject } from '../resources/project/project.model';
import type { IClient } from '../resources/client/client.model';

export interface IPayload {
  id: Types.ObjectId;
}

export interface IRequestWithUserId extends Request {
  userId: string;
}

export interface IQueryString {
  page?: number;
  sort?: string;
  limit?: number;
  fields?: string;
}

export type AnyModel = IUser | IProject | IClient

export interface TokenInterface {
  id: string;
}
