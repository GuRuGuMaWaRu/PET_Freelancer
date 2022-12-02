const express = require("express");
const mongoose = require("mongoose");

const { protect, catchAsync } = require("../../utils");
const projectControllers = require("./project.controllers");
const Project = require("./project.model");

const router = express.Router();

router.use(protect);

router
  .route("/")
  // @route     GET projects/
  // @desc      Get all projects
  // @access    Private
  .get(projectControllers.getAll)
  // @route     POST projects/
  // @desc      Create project
  // @access    Private
  .post(projectControllers.createOne);

router
  .route("/lastYear")
  // @route     GET projects/lastYear
  // @desc      Get projects from year ago and up till now
  // @access    Private
  .get(
    catchAsync(async (req, res) => {
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);

      const projects = await Project.aggregate([
        {
          $match: {
            user: mongoose.Types.ObjectId(req.userId),
            deleted: false,
            date: {
              $gte: currentDate,
            },
          },
        },
        {
          $lookup: {
            from: "clients",
            localField: "client",
            foreignField: "_id",
            as: "fromClients",
          },
        },
        { $addFields: { clientObj: { $arrayElemAt: ["$fromClients", 0] } } },
        { $addFields: { client: "$clientObj.name" } },
        { $project: { fromClients: 0, clientObj: 0 } },
      ]);

      res.status(200).json({
        status: "success",
        results: projects.length,
        data: projects,
      });
    }),
  );

router
  .route("/:id")
  // @route     GET projects/:id
  // @desc      Get project
  // @access    Private
  .get(projectControllers.getOne)
  // @route     PATCH projects/:id
  // @desc      Update project
  // @access    Private
  .patch(projectControllers.updateOne)
  // @route     DELETE projects/:id
  // @desc      Delete project
  // @access    Private
  .delete(projectControllers.deleteOne);

module.exports = router;
