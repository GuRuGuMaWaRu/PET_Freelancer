const mongoose = require("mongoose");
const Project = require("../models/projectModel");

require("dotenv").config({ path: "process.env" });

mongoose.connect(process.env.DB_MAIN, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connection to database is established"));

// Permanent deletion of all data marked as deleted
const finalDelete = async () => {
  try {
    await Project.deleteMany({ deleted: true });
    console.log("Projects marked for deletion are deleted");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === "--final-delete") {
  finalDelete();
}
