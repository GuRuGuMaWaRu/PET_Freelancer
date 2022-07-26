import mongoose from "mongoose";

if (process.env.NODE_ENV !== "test") {
  const address =
    process.env.NODE_ENV === "development"
      ? process.env.DB_DEVELOPMENT ?? "mongodb://localhost:27017/"
      : process.env.DB_MAIN ?? "mongodb://localhost:27017/";

  mongoose
    .connect(address)
    // eslint-disable-next-line
    .then(() => console.log("Connection to database is established"))
    // eslint-disable-next-line
    .catch(err => console.log(`Connection error: ${err}`));

  // eslint-disable-next-line
  mongoose.connection.on("error", err => console.log(err));
}
