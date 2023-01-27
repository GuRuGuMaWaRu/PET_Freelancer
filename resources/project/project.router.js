const express = require("express");
const mongoose = require("mongoose");

const { protect, catchAsync, AppError } = require("../../utils");
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

      //** Return early if no user ID is provided  */
      if (!req.userId) {
        return next(new AppError(400, "User ID is required"));
      }

      //** Construct DB query based on request params */
      const aggregationPipeline = [
        {
          $match: {
            user: mongoose.Types.ObjectId(req.userId),
            deleted: { $ne: true },
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "client",
            foreignField: "_id",
            as: "client",
          },
        },
        {
          $project: {
            _id: 1,
            projectNr: 1,
            payment: 1,
            currency: 1,
            date: 1,
            paid: 1,
            comments: 1,
            client: { $first: "$client" },
          },
        },
      ];

      //** Sorting stage */
      if (Object.hasOwn(req.query, "sort")) {
        const sortDir = req.query.sort.startsWith("-") ? -1 : 1;
        const sortItem = req.query.sort.replace("-", "");

        aggregationPipeline.push({
          $sort: { [sortItem]: sortDir, date: -1 },
        });
      } else {
        aggregationPipeline.push({
          $sort: { date: -1, _id: 1 },
        });
      }

      //** Pagination stage */
      if (
        Object.hasOwn(req.query, "limit") &&
        Object.hasOwn(req.query, "page")
      ) {
        aggregationPipeline.push(
          {
            $skip: (Number(req.query.page) - 1) * Number(req.query.limit),
          },
          { $limit: Number(req.query.limit) },
        );
      }

      const docs = await Project.aggregate(aggregationPipeline);

      const count = await Project.countDocuments({
        user: req.userId,
        deleted: { $ne: true },
      });

      res.status(200).json({
        status: "success",
        results: docs.length,
        data: { docs, allDocs: count },
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
