const User = require("./user.model");
const { crudControllers } = require("../../utils");

module.exports = crudControllers(User);
