const express = require("express");
const logger = require("../logger");
const NeededService = require("./needed-service");
const isAuth = require("../middleware/auth");

const neededRouter = express.Router();

neededRouter.route("/").post((req, res, next) => {
  const knexInstance = req.app.get("db");
  const eventId = req.body.event_id;
  NeededService.getAllNeeded(knexInstance, eventId)
    .then((items) => {
      res.json(items);
    })
    .catch(next);
});
neededRouter.route("/add-item").post((req, res, next) => {
  const knexInstance = req.app.get("db");

  const { id, neededItems } = req.body;
  neededItems.forEach((item) => {
    const newItem = { event_id: id, item_name: item };
    NeededService.addItem(knexInstance, newItem).catch(next);
  });
  res.json({ message: "Items added successfully" });
});

neededRouter.route("/update-item").post((req, res, next) => {
  const knexInstance = req.app.get("db");
  const { id, items } = req.body;
  items.forEach((item) => {
    item.user_id = id;
    NeededService.updateItems(knexInstance, item.id, item)
      .then((items) => {})
      .catch(next);
  });
  res.json({ message: "Items updated Successfully" });
});
neededRouter.route("/needed-user").post((req, res, next) => {
  const knexInstance = req.app.get("db");
  let userNames = {id:1}
  req.body.forEach(id => {
    let tempUser = {}
    NeededService.getById(knexInstance, id)
    .then((users) => {
      userNames[id] = {first: users.first_name, last: users.last_name}
    
    })
    .catch(next);
  })
  res.json(userNames)
});
module.exports = neededRouter;
