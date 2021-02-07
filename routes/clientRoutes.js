const express = require("express");

const auth = require("../middleware/auth");
const clientController = require("../controllers/clientController");

const router = express.Router();

router.use(auth);

router
  .route("/")
  // @route     GET clients/
  // @desc      Get all clients
  // @access    Private
  .get(clientController.getAllClients)
  // @route     POST clients/
  // @desc      Create client
  // @access    Private
  .post(clientController.createClient);

router
  .route("/:id")
  // @route     GET clients/:id
  // @desc      Get client
  // @access    Private
  .get(clientController.getClient)
  // @route     PATCH clients/:id
  // @desc      Update client
  // @access    Private
  .patch(clientController.updateClient)
  // @route     DELETE clients/:id
  // @desc      Delete client
  // @access    Private
  .delete(clientController.deleteClient);

module.exports = router;
