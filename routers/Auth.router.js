const AuthModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function CREATE_USER(req, res, next) {
  const { email, phoneNumber, password } = req.body;
  if (password) {
    bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        // Store hash in your password DB.
        const newUser = new AuthModel({ ...req.body, password: hash });
        newUser
          .save()
          .then((response) => {
            if (response._id) {
              return res.status(200).json({
                success: true,
                message: "Signup succesfull",
              });
            } else {
              return res.status(401).json({
                success: false,
                message: "Something went wrong",
              });
            }
          })
          .catch((error) => {
            return res.status(401).json({
              success: false,
              error: error,
              message: "Something went wrong",
            });
          });
      })
      .catch((error) => {
        return res.status(401).json({
          success: false,
          error: error,
          message: "Something went wrong",
        });
      });
  }
}

function GET_ALL_USERS(req, res, next) {
  AuthModel.find()
    .then((response) => {
      if (response.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Users fetched successfully",
          data: response,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "No users found",
          data: [],
        });
      }
    })
    .catch((error) => {
      return res.status(401).json({
        success: true,
        message: "Something went wrong",
        error: error,
      });
    });
}

function SIGN_IN_USER(req, res, next) {
  /**
   * GET EMAIL, PASSWORD
   * CHECK EMAIL IS AVAILABLE IN THE DB OR NOT
   * IF EMAIL IS AVAILABLE
   *        1. CHECK WHETHER PASSWORD IS MATCHING
   *        2. IF PASSWORD IS MATCHING
   *              USER IS VALID USER AND ALLOW HIM TO LOGIN
   *            IF PASSWORD IS NOT MATCHING
   *              SEND ERROR THAT EMAIL OR PASSWORD IS WRONG
   * IF EMAIL IS NOT AVAILABLE
   *        1. SEND ERROR THAT USER ACCOUNT IS NOT EXISTS
   */
  const { email = "", password = "" } = req.body;
  if (email && password) {
    AuthModel.findOne({ email: email }).then((response) => {
      if (response) {
        bcrypt.compare(password, response.password).then(function (result) {
          if (result) {
            return res.status(200).json({
              success: true,
              message: "Sign In successful",
            });
          } else {
            return res.status(401).json({
              success: false,
              message: "Email or Password is wrong",
            });
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "User account does'nt exists",
        });
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
}

module.exports = {
  CREATE_USER,
  GET_ALL_USERS,
  SIGN_IN_USER,
};
