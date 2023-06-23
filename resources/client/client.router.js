const express = require("express");

const { protect, catchAsync } = require("../../utils");
const clientControllers = require("./client.controllers");
const Project = require("../project/project.model");

const router = express.Router();

router.use(protect);

router
  .route("/")
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  .get(clientControllers.getAll)
  // @route     POST clients/
  // @desc      Create client
  // @access    Private
  .post(clientControllers.createOne);

router
  .route("/withprojectdata")
  /**
   * @route     GET projects/withprojectdata
   * @desc      Get projects with project data
   * @access    Private
   */
  .get(
    catchAsync(async (req, res) => {
      const pipeline = [
        //* Match projects that are not deleted
        {
          $match: {
            deleted: false,
          },
        },
        //* Populate the client details
        {
          $lookup: {
            from: "clients",
            localField: "client",
            foreignField: "_id",
            as: "clientDetails",
          },
        },
        //* Unwind the clientDetails array
        {
          $unwind: "$clientDetails",
        },
        //* Group projects by client and calculate aggregated data
        {
          $group: {
            _id: "$client",
            clientName: { $first: "$clientDetails.name" },
            totalProjects: { $sum: 1 },
            firstProjectDate: { $min: "$date" },
            lastProjectDate: { $max: "$date" },
            totalEarnings: { $sum: "$payment" },
            projectsLast30Days: {
              $sum: {
                $cond: {
                  if: {
                    $gte: [
                      "$date",
                      {
                        $subtract: [new Date(), 30 * 24 * 60 * 60 * 1000],
                      },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            projectsLast90Days: {
              $sum: {
                $cond: {
                  if: {
                    $gte: [
                      "$date",
                      {
                        $subtract: [new Date(), 90 * 24 * 60 * 60 * 1000],
                      },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
            projectsLast365Days: {
              $sum: {
                $cond: {
                  if: {
                    $gte: [
                      "$date",
                      {
                        $subtract: [new Date(), 365 * 24 * 60 * 60 * 1000],
                      },
                    ],
                  },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            clientName: 1,
            totalProjects: 1,
            firstProjectDate: 1,
            lastProjectDate: 1,
            totalEarnings: 1,
            projectsLast30Days: 1,
            projectsLast90Days: 1,
            projectsLast365Days: 1,
            daysSinceLastProject: {
              $trunc: {
                $divide: [
                  {
                    $subtract: [new Date(), "$lastProjectDate"],
                  },
                  24 * 60 * 60 * 1000, // Convert milliseconds to days
                ],
              },
            },
          },
        },
      ];
      const result = await Project.aggregate(pipeline);

      res.status(200).json({
        status: "success",
        results: result.length,
        data: result,
      });
    }),
  )
  .get();

router
  .route("/:id")
  // @route     GET clients/:id
  // @desc      Get client
  // @access    Private
  .get(clientControllers.getOne)
  // @route     PATCH clients/:id
  // @desc      Update client
  // @access    Private
  .patch(clientControllers.updateOne)
  // @route     DELETE clients/:id
  // @desc      Delete client
  // @access    Private
  .delete(clientControllers.deleteOne);

module.exports = router;
