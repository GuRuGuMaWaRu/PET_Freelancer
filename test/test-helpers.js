const mongoose = require("mongoose");
const Project = require("../models/Project");
const Client = require("../models/Client");

before(done => {
  // mongoose
  //   .connect(process.env.DB_TEST, {
  //     useUnifiedTopology: true,
  //     useNewUrlParser: true
  //   })
  //   .then(() => {
  //     console.log("Connected to test database...");
  //     done();
  //   })
  //   .catch(err => console.log(err));
  mongoose.connect(process.env.DB_TEST, { useNewUrlParser: true });
  mongoose.connection
    .once("open", () => done())
    .on("error", err => console.warn(`Warning: ${err}`));
});

beforeEach(done => {
  // const { projects, clients } = mongoose.connection.collections;
  // console.log(mongoose.connection.collections);
  // Promise.all([projects.drop(), clients.drop()])
  //   .then(() => {
  //     done();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     done();
  //   });

  function clearDB() {
    var promises = [Project.deleteMany().exec(), Client.deleteMany().exec()];

    Promise.all(promises).then(function() {
      done();
    });
  }

  clearDB();
  // if (mongoose.connection.readyState === 0) {
  //   mongoose.connect(process.env.DB_TEST, { useNewUrlParser: true }, function(
  //     err
  //   ) {
  //     if (err) {
  //       throw err;
  //     }
  //     return clearDB();
  //   });
  // } else {
  //   return clearDB();
  // }
});
