const express = require("express");
const mongoose = require("mongoose");

const { protect, catchAsync, AppError, APIFeatures } = require("../../utils");
const projectControllers = require("./project.controllers");
const Project = require("./project.model");
const Client = require("../client/client.model");

const router = express.Router();

router.use(protect);

router
  .route("/")
  /**
   * @route     GET projects/
   * @desc      Get all projects
   * @access    Private
   */
  .get(
    catchAsync(async (req, res, next) => {
      const { page, limit } = req.query;
      const filter = {};

      if (req.userId) {
        filter.user = req.userId;
      }

      const { query } = new APIFeatures(Project.find(filter), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      const docs = await query.lean().exec();
      const count = await Project.count();
      const nextPage =
        Number(page) * Number(limit) < count ? Number(page) + 1 : undefined;

      res.status(200).json({
        status: "success",
        results: docs.length,
        data: { docs, page: nextPage },
      });
    }),
  )
  /**
   * @route     POST projects/
   * @desc      Create a project
   * @access    Private
   */
  .post(
    catchAsync(async (req, res, next) => {
      const body = { ...req.body };

      //** Confirm data  */
      if (
        !body.payment ||
        !body.currency ||
        !body.projectNr ||
        !body.client ||
        !body.date
      ) {
        return next(new AppError(400, "All fields are required"));
      }

      //** Add userId to the data */
      if (req.userId && Project.collection.collectionName !== "users") {
        body.user = req.userId;
      }

      //** Get a client Id or create a new client if necessary */
      let client = await Client.findOne({
        name: body.client,
      })
        .lean()
        .exec();

      if (!client) {
        client = await Client.create({
          name: body.client,
          user: body.user,
        });
      }

      body.client = client._id;

      const doc = await Project.create(body);

      res.status(201).json({
        status: "success",
        data: doc.toJSON(),
      });
    }),
  );

router
  .route("/lastYear")
  /**
   * @route     GET projects/lastYear
   * @desc      Get projects from year ago and up till now
   * @access    Private
   */
  .get(
    catchAsync(async (req, res) => {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      currentDate.setDate(1);

      const projects = await Project.find({
        user: mongoose.Types.ObjectId(req.userId),
        deleted: false,
        date: {
          $gte: currentDate,
        },
      })
        .lean()
        .exec();

      res.status(200).json({
        status: "success",
        results: projects.length,
        data: projects,
      });
    }),
  );

router
  .route("/:id")
  /**
   * @route     GET projects/:id
   * @desc      Get a project
   * @access    Private
   */
  .get(projectControllers.getOne)
  /**
   * @route     PATCH projects/:id
   * @desc      Update a project
   * @access    Private
   */
  .patch(projectControllers.updateOne)
  /**
   * @route     DELETE projects/:id
   * @desc      Delete a project
   * @access    Private
   */
  .delete(projectControllers.deleteOne);

module.exports = router;
