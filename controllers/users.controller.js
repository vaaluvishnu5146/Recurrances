const UsersRouter = require("express").Router();

/**
 * METHOD = GET
 * DESCRIPTION = Helps to get data from the database
 * COLLECTION = Events
 */
UsersRouter.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Successful",
  });
});

/**
 * METHOD = POST
 * DESCRIPTION = Helps to post data to the database
 * COLLECTION = Events
 */
UsersRouter.post("/create", (req, res, next) => {
  return res.status(200).json({
    message: "Successful creating users",
  });
});

module.exports = UsersRouter;
