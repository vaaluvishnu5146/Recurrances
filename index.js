const express = require("express");
const HTTP_SERVER = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const { connectToDatabase } = require("./database/dbconfig");

// Configuring Dotenv package for creating custom ENVIRONMENT VARIABLES
require("dotenv").config();

console.log(process.env.NODE_ENV);

// INITIATING CONNECTION WITH DATABASE
connectToDatabase();

// SET THE VIEW ENGINE TO EJS
HTTP_SERVER.set("view engine", "ejs");

// Configure the server to accept JSON
HTTP_SERVER.use(bodyparser.json());

// DEFINING A PORT AND LISTENING TO PORT WITH EXPRESS SERVER
const PORT = process.env.DEV_SERVER_PORT;
HTTP_SERVER.listen(PORT, process.env.NODE_HOSTNAME, () => {
  console.log("Server started successfully!");
});

// PATH TO SERVER PAGES
// index
HTTP_SERVER.get("/", (req, res) => {
  res.render("pages/index");
});
// about
HTTP_SERVER.get("/about", (req, res) => {
  res.render("pages/about");
});

var whitelist = [
  "http://127.0.0.1:5500",
  undefined,
  "https://recurrances.onrender.com",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// ENABLING CORS
HTTP_SERVER.use(cors());

// REGISTERING ALL THE CONTROLLERS
HTTP_SERVER.use("/api/events", require("./controllers/events.controller"));
HTTP_SERVER.use("/api/users", require("./controllers/users.controller"));

HTTP_SERVER.all("/", (req, res) => {
  return res.status(200).json({
    message: "Request Successful",
  });
});
