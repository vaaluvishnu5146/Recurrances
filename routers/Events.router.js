const Mongoose = require("mongoose");
const EventsModel = require("../models/Events.model");

function GET_ALL_EVENTS(req, res, next) {
  EventsModel.find()
    .then((response) => {
      if (response.length < 1) {
        return res.status(200).json({
          success: true,
          data: response,
          message: "No Events found",
        });
      } else {
        return res.status(200).json({
          success: true,
          data: response,
          message: "Events fetched successfully",
        });
      }
    })
    .catch((e) => {
      return res.status(402).json({
        success: false,
        error: e,
        message: "Something went wrong",
      });
    });
}

function CREATE_NEW_EVENT(req, res, next) {
  const newEvent = new EventsModel(req.body);
  newEvent
    .save()
    .then((response) => {
      if (response._id) {
        return res.status(200).json({
          success: true,
          message: "Event created successfully",
          data: response,
        });
      } else {
        throw new Error({
          message: "Something went wrong",
        });
      }
    })
    .catch((err) => {
      return res.status(402).json({
        success: false,
        error: err,
      });
    });
}

function DELETE_EVENT(req, res, next) {
  const { id = "" } = req.params;
  EventsModel.deleteOne({ _id: new Mongoose.Types.ObjectId(id) })
    .then((response) => {
      if (response.acknowledged && response.deletedCount) {
        return res.status(200).json({
          success: true,
          message: "Event deleted successfully",
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Deletion not successful",
        });
      }
    })
    .catch((err) => {
      return res.status(402).json({
        success: false,
        error: err,
      });
    });
}

module.exports = {
  GET_ALL_EVENTS,
  CREATE_NEW_EVENT,
  DELETE_EVENT,
};
