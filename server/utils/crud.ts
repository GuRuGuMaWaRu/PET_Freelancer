import { Model, HydratedDocument } from "mongoose";
import type { Response, NextFunction } from "express";
import type { IRequestWithUserId } from "../types/index";

import { catchAsync, AppError, APIFeatures } from ".";

interface IFilter {
  user?: string;
  _id: string;
}

const getAll = <T>(Model: Model<T>) =>
  catchAsync(async (req: IRequestWithUserId, res: Response) => {
    const filter: Omit<IFilter, '_id'> = {};

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const { query } = new APIFeatures<T>(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await query.lean().exec();

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs
    });
  });

const getOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: IRequestWithUserId, res: Response, next: NextFunction) => {
    const filter:  IFilter = { _id: req.params.id };

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const doc = await Model.findOne(filter)
      .lean()
      .exec();

    if (!doc) {
      return next(new AppError(404, "No doc found with this ID"));
    }

    res.status(200).json({
      status: "success",
      data: doc
    });
  });

const updateOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: IRequestWithUserId, res: Response, next: NextFunction) => {
    const filter: IFilter = { _id: req.params.id };

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true
    })
      .lean()
      .exec();

    if (!doc) {
      return next(new AppError(404, "No doc found with this ID"));
    }

    res.status(200).json({
      status: "success",
      data: doc
    });
  });

// TODO: do I need both updatedOne and deleteOne if they are basically the same?
const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: IRequestWithUserId, res: Response, next: NextFunction) => {
    const filter: IFilter = { _id: req.params.id };

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(
      filter,
      { deleted: true },
      { new: true }
    )
      .lean()
      .exec();

    if (!doc) {
      return next(new AppError(404, "No doc found with this ID"));
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  });

const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: IRequestWithUserId, res: Response) => {
    const body = { ...req.body };

    if (req.userId && Model.collection.collectionName !== "users") {
      body.user = req.userId;
    }

    const doc = await Model.create(body) as HydratedDocument<T, {}, {}>;

    res.status(201).json({
      status: "success",
      data: doc
    });
  });

export const crudControllers = <T>(Model: Model<T>) => ({
  getAll: getAll(Model),
  getOne: getOne(Model),
  updateOne: updateOne(Model),
  deleteOne: deleteOne(Model),
  createOne: createOne(Model)
});
