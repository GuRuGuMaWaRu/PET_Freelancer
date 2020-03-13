const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const clientsRouter = require("./routes/clients");
const projectsRouter = require("./routes/projects");

// Set environament variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "process.env" });
}

// Connect to mongo DB
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  mongoose.connect(process.env.DB_MAIN, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  });

  mongoose.set("useCreateIndex", true);
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connection to database is established"));

const app = express();

// Set up middleware
app.use(logger("dev"));
app.use(express.json());

// Set CORS headers so that React SPA is able to communicate with this server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Set up routes
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/projects", projectsRouter);
app.use("/clients", clientsRouter);

// Heroku deployment --- serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Handle 404 errors
app.all("*", (req, res, next) => {
  const err = new Error(`Cannot find ${req.originalUrl} on this server`);

  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

// Handle all errors
app.use((err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

// Connect to server
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
