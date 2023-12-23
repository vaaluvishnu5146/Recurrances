const mongoose = require("mongoose");

const EventsSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventStartDate: {
    type: String,
    required: true,
  },
  eventEndDate: {
    type: String,
    required: true,
  },
  eventType: {
    type: String, // Concert, Marathon, Dance, Standup comedy
    required: true,
  },
  eventCommercials: {
    ticketActualPrice: {
      type: Number,
      required: true,
    },
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("events", EventsSchema);
