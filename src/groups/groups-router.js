const express = require("express");
const xss = require("xss");
const logger = require("../logger");
const GroupsService = require("./groups-service");
const isAuth = require("../middleware/auth");

const groupsRouter = express.Router();

const serializeGroup = (group) => ({
  id: group.id,
  group_name: xss(group.group_name),
  pitch: xss(group.pitch),
  leader_phone: xss(group.leader_phone),
  group_leader: group.group_leader,
  group_location: xss(group.group_location),
  time_date: xss(group.time_date),
  more_info: xss(group.more_info),
  user_ids: group.user_ids,
});

groupsRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  GroupsService.getAllGroups(knexInstance)
    .then((groups) => {
      res.json(groups.map(serializeGroup));
    })
    .catch(next);
});
groupsRouter.route("/joingroup", isAuth).post((req, res, next) => {
  const knexInstance = req.app.get("db");
  const { group_name, user_ids } = req.body;
  let userId = req.userId;
  let message;
  if (!user_ids.includes(userId.toString())) {
    console.log("string");
    let users = user_ids.push(userId);
    message = "Group Joined Successfully!";
  } else {
    message = "Already Joined Group";
  }

  console.log(user_ids);
  GroupsService.updateGroup(knexInstance, user_ids, group_name)
    .then((group) => {
      // logger.info(`User joined group with id ${group.id}.`)
      res.status(201).json({ message: message });
    })
    .catch((error) => {
      console.log(error);
    });
});
groupsRouter.route("/creategroup", isAuth).post((req, res, next) => {
  for (const field of [
    "group_name",
    "leader_phone",
    "group_location",
    "time_date",
  ]) {
    let createMessage;
    if (!req.body[field]) {
      logger.error(`${field} is required`);
      createMessage = `'${field}' is required`;
    } else {
      createMessage = "Group created successfully!";
    }
  }
  const knexInstance = req.app.get("db");
  const {
    group_name,
    pitch,
    leader_phone,
    group_location,
    time_date,
    more_info,
  } = req.body;
  let userId = req.userId;
  let groupData = {
    group_name,
    pitch,
    leader_phone,
    group_location,
    time_date,
    more_info,
    group_leader: userId,
    user_ids: `{ ${userId} }`,
  };

  GroupsService.addGroup(knexInstance, groupData)
    .then((group) => {
      logger.info(`Group with name ${group.group_name} created.`);
      res.status(201).json({ message: "Group created successfully!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = groupsRouter;
