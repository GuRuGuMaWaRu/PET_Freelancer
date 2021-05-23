const User = require("./user.model");
const crudControllers = require("../../utils/crud");

module.exports = crudControllers(User);
