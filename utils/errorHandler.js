module.exports = (err, req, res) => {
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
