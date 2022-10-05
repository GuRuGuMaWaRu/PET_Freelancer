import type { Request, Response, NextFunction } from "express";
import type { IRequestWithUserId, TokenInterface } from "../types";
import jwt from "jsonwebtoken";
import { AppError } from ".";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new AppError(401, "No token provided, authorization denied"));
  }

  const token = bearer.split(" ")[1].trim();

  try {
    const decoded  = jwt.verify(token, process.env.JWT_SECRET ?? 'secret');
    (req as IRequestWithUserId).userId = (decoded as TokenInterface).id;
    next();
  } catch (err) {
    next(new AppError(401, "Token is not valid"));
  }
};
