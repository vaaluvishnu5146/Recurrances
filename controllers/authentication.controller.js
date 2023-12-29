const {
  CREATE_USER,
  GET_ALL_USERS,
  SIGN_IN_USER,
} = require("../routers/Auth.router");

const AuthRouter = require("express").Router();

// SIGNUP
/**
 * METHOD = POST
 * DESCRIPTION = Helps to create new user account
 * COLLECTION = users
 */
AuthRouter.post("/signup", CREATE_USER);

// GET ALL USERS
/**
 * METHOD = GET
 * DESCRIPTION = Helps to get all user accounts
 * COLLECTION = users
 */
AuthRouter.get("/", GET_ALL_USERS);

// SIGNIN
/**
 * METHOD = POST
 * DESCRIPTION = Helps to Signin user
 * COLLECTION = users
 */
AuthRouter.post("/signin", SIGN_IN_USER);
// FORGOT PASSWORD
// CHANGE PASSWORD

module.exports = AuthRouter;
