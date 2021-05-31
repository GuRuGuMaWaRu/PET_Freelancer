const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorHandler");
const authRouter = require("./routes/authRoutes");
const clientRouter = require("./resources/client/client.router");
const projectRouter = require("./resources/project/project.router");
const userRouter = require("./resources/user/user.router");
const { signUp } = require("./utils/auth");

// Set environament variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "process.env" });
}

// Connect to mongo DB
require("./db");

const app = express();

// Secure HTTP headers
// app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      scriptSrc: ["'self'", "'unsafe-inline'"]
    }
  })
);

// Development logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Compress text data
app.use(compression());

// Body parser
app.use(express.json({ limit: "10kb" }));

// Set CORS headers so that React SPA is able to communicate with this server
app.use(cors());

// Set up routes
app.use("/signup", signUp);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/users", userRouter);

// Heroku deployment --- serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Handle 404 (Not Found) errors
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Handle all errors
app.use(globalErrorHandler);

// Connect to server
const PORT = process.env.PORT || 6000;

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
