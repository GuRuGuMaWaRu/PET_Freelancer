const mongoose = require("mongoose");
const Project = require("../models/projectModel");
const Client = require("../models/clientModel");

before((done) => {
  mongoose.connect(process.env.DB_TEST, {
    useNewUrlParser: true,
    useFindAndModify: false,
  });
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => console.warn(`Warning: ${err}`));
});

beforeEach((done) => {
  function clearDB() {
    const promises = [Project.deleteMany().exec(), Client.deleteMany().exec()];

    Promise.all(promises).then(() => done());
  }

  clearDB();
});
