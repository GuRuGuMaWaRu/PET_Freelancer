const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const clientRouter = require("./routes/clientRoutes");
const projectRouter = require("./routes/projectRoutes");

// Set environament variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "process.env" });
}

// Connect to mongo DB
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.DB_MAIN, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.log("Connection to database is established"))
    .catch(err => console.log(`Connection error: ${err.reason}`));

  mongoose.connection.on("error", err => console.log(err));
}

const app = express();

// Development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json({ limit: "10kb" }));

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

// Heroku deployment --- serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Set up routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/clients", clientRouter);

// Handle 404 errors
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Handle all errors
app.use(globalErrorHandler);

// Connect to server
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
