const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/recurrance")
    .then((response) => console.log("Database connection successful"))
    .catch((e) => console.log(e));
}

module.exports = {
  connectToDatabase,
};
