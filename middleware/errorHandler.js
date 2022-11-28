const { logEvents } = require("./logger");

const errorHandler = (err, req, res) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log",
  );
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (req.accepts("json")) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.type("txt").send("404 Not Found");
  }
};

module.exports = errorHandler;
