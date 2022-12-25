const { catchAsync, AppError, APIFeatures } = require(".");

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = {};

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const { query } = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await query.lean().exec();

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
  });

const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

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
      data: doc,
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = { _id: req.params.id };

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
      upsert: true,
      setDefaultsOnInsert: true,
    })
      .lean()
      .exec();

    if (!doc) {
      return next(new AppError(404, "No doc found with this ID"));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "ID is required",
      });
    }

    const filter = { _id: id };

    if (req.userId && Model.collection.collectionName !== "users") {
      filter.user = req.userId;
    }

    const doc = await Model.findOneAndUpdate(
      filter,
      { deleted: true },
      { new: true },
    )
      .lean()
      .exec();

    if (!doc) {
      return next(new AppError(404, "Nothing is found with the provided ID"));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const body = { ...req.body };

    if (req.userId && Model.collection.collectionName !== "users") {
      body.user = req.userId;
    }

    const doc = await Model.create(body);

    res.status(201).json({
      status: "success",
      data: doc.toJSON(),
    });
  });

module.exports = (Model) => ({
  getAll: getAll(Model),
  getOne: getOne(Model),
  updateOne: updateOne(Model),
  deleteOne: deleteOne(Model),
  createOne: createOne(Model),
});
