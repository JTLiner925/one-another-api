const express = require("express");
const xss = require("xss");
const EventsService = require("./events-service");
const isAuth = require("../middleware/auth");

const eventsRouter = express.Router();

const serializeEvent = (event) => ({
  id: event.id,
  announcements: xss(event.announcements),
  needed_items: event.needed_items.map(xss),
  event_date: xss(event.event_date),
  event_time: xss(event.event_time),
  lesson_title: xss(event.lesson_title),
  bible_passage: xss(event.bible_passage),
  question: event.question.map(xss),
  event_leader: event.event_leader,
  group_event: event.group_event,
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

eventsRouter.route('/createevent', isAuth).post((req, res, next) => {
  const knexInstance = req.app.get("db");
  const { 
    announcements, 
    needed_items, 
    event_date, 
    event_time, 
    lesson_title, 
    bible_passage, 
    question,
   groupid,
    
  } = req.body;
  let userId = req.userId;
  console.log(userId)
  
  console.log(groupid)
  let eventData = { 
    announcements, 
    needed_items: needed_items.split(/\n|,/), 
    event_date, 
    event_time, 
    lesson_title, 
    bible_passage, 
    question: question.split('\n'),
    group_event: groupid,
    event_leader: userId,
     }
  
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