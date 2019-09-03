const mongoose = require("mongoose");

before(done => {
  mongoose
    .connect(process.env.DB_TEST)
    .then(() => done())
    .catch(err => console.log(err));
});

beforeEach(done => {
  const clientCollection = mongoose.connection.collections.clients;
  const projectCollection = mongoose.connection.collections.projects;

  Promise.all([clientCollection.drop(), projectCollection.drop()]).then(() =>
    done()
  );
});
