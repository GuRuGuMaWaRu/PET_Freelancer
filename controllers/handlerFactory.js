const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    if (req.userId) {
      filter.user = req.userId;
    }

    const docs = await Model.find(filter);

    res
      .status(200)
      .json({ status: "success", results: docs.length, data: { data: docs } });
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
