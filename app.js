const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const projectsRouter = require("./routes/projects");
const clientsRouter = require("./routes/clients");
const authRouter = require("./routes/auth");

// Set environament variables
require("dotenv").config({ path: "process.env" });

// Connect to mongo DB
mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
app.use("/", authRouter);

module.exports = app;
