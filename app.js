const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { AppError } = require("./utils");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const { clientRouter, projectRouter, userRouter } = require("./resources");

// Set environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "process.env" });
}

// Connect to mongo DB
require("./db");

const app = express();

// Logger
app.use(logger);

// Secure HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }),
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
app.use(cors(corsOptions));

// Set up routes
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./resources/root"));
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/users", userRouter);

// Heroku deployment --- serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")),
  );
}

// Handle 404 (Not Found) errors
app.all("*", (req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.resolve(__dirname, "views", "404.html"));
  } else {
    next(new AppError(404, `Cannot find ${req.originalUrl} on this server`));
  }
});

// Handle all errors
app.use(errorHandler);

// Connect to server
const PORT = process.env.PORT || 6000;

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
