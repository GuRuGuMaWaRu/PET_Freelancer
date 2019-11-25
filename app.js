const express = require("express");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const projectsRouter = require("./routes/projects");
const clientsRouter = require("./routes/clients");

// Set environament variables
require("dotenv").config({ path: "process.env" });

// Connect to mongo DB
if (process.env.NODE_ENV === "development") {
  mongoose.connect(process.env.DB_MAIN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });
}

const app = express();

app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use((req, res, next) => {
  // Set CORS headers so that React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/projects", projectsRouter);
app.use("/clients", clientsRouter);

// Handle 404 errors
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
// Handle all errors
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({ msg: error.message });
});

module.exports = app;
