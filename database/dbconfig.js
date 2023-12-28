const mongoose = require("mongoose");

function connectToDatabase() {
  const dbUrl =
    process.env.NODE_ENV === "development"
      ? `${process.env.DEV_DB_URI}${process.env.DEV_DB_LABEL}`
      : `${process.env.PROD_DB_URI}${process.env.PROD_DB_LABEL}`;
  mongoose
    .connect(dbUrl)
    .then((response) => console.log("Database connection successful"))
    .catch((e) => console.log(e));
}

module.exports = {
  connectToDatabase,
};
