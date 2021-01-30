const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const filter = {};
    if (req.userId) {
      filter.user = req.userId;
    }

    const { query } = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await query;

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { data: docs }
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

    if (req.userId) {
      filter.user = req.userId;
    }

    const doc = await Model.findOne(filter);

    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { data: doc }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

    if (req.userId) {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { data: doc }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

    if (req.userId) {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(
      filter,
      { deleted: true },
      { new: true }
    );

    if (!doc) {
      return next(new AppError("No doc found with this ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const body = { ...req.body };
    if (req.userId) {
      body.user = req.userId;
    }

    const doc = await Model.create(body);
    res.status(201).json({
      status: "success",
      data: { data: doc }
    });
  });
