const {
  GET_ALL_EVENTS,
  CREATE_NEW_EVENT,
  DELETE_EVENT,
} = require("../routers/Events.router");

const EventsRouter = require("express").Router();

/**
 * METHOD = GET
 * DESCRIPTION = Helps to get data from the database
 * COLLECTION = Events
 */
EventsRouter.get("/", GET_ALL_EVENTS);

/**
 * METHOD = POST
 * DESCRIPTION = Helps to post data to the database
 * COLLECTION = Events
 */
EventsRouter.post("/create", CREATE_NEW_EVENT);

/**
 * METHOD = DELETE
 * DESCRIPTION = Helps to Delete data from the database
 * COLLECTION = Events
 */
EventsRouter.delete("/:id", DELETE_EVENT);

module.exports = EventsRouter;
