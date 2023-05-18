const mongoose = require("mongoose");
const { logEvents } = require("./middleware/logger");

if (process.env.NODE_ENV !== "test") {
  const address =
    process.env.NODE_ENV === "development"
      ? process.env.DB_DEVELOPMENT
      : process.env.DB_MAIN;

  //** Disable autoIndex in production so as not to slow down the server */
  const autoIndex = process.env.NODE_ENV === "development" ? true : false;

  mongoose
    .connect(address, { autoIndex })
    // eslint-disable-next-line
    .then(() => console.log("Connection to database is established"))
    // eslint-disable-next-line
    .catch((err) => console.log(`Connection error: ${err.reason}`));

  // eslint-disable-next-line
  mongoose.connection.on("error", (err) => {
    console.log(err);
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log",
    );
  });
}
