const express = require("express");
const xss = require("xss");
const EventsService = require("./events-service");

const eventsRouter = express.Router();

const serializeEvent = (event) => ({
  id: event.id,
  announcements: event.announcements,
  needed_items: xss(event.needed_items),
  event_date: xss(event.event_date),
  event_time: xss(event.event_time),
  lesson_title: xss(event.lesson_title),
  bible_passage: xss(event.bible_passage),
  question: xss(event.question),
})

eventsRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get("db");
  console.log(req.app.get("db"));
  EventsService.getAllEvents(knexInstance)
    .then((events) => {
      res.json(events.map(serializeEvent));
    })
    .catch(next);
})

eventsRouter.route('/createevent').post((req, res, next) => {
  const knexInstance = req.app.get("db");
  const { announcements, needed_items, event_date, event_time, lesson_title, bible_passage, question } = req.body;
  let eventData = { announcements, needed_items, event_date, event_time, lesson_title, bible_passage, question }
  EventsService.addEvent(knexInstance, eventData)
  .then((events) => {
    console.log(events);
    res.status(201).json({ message: 'Event created successfully!'})
  })
  .catch((error) => {
    console.log(error);
  });
  })
module.exports = eventsRouter