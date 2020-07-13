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
    let users = user_ids.push(userId);
    message = "Group Joined Successfully!";
  } else {
    message = "Already Joined Group";
  }

  GroupsService.updateGroup(knexInstance, user_ids, group_name)
    .then((group) => {
      res.status(201).json({ message: message });
    })
    .catch((error) => {
      console.log(error);
    });
});
groupsRouter.route("/creategroup", isAuth).post((req, res, next) => {
  for (const field of ["leader_phone", "group_location", "time_date"]) {
    if (!req.body[field]) {
      logger.error(`${field} is required`);
      return res.status(400).send({
        error: { message: `'${field}' is required` },
      });
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
      if (group) {
        logger.info(`Group with name ${group.group_name} created.`);
        res
          .status(201)
          .json({ message: `Group with name ${group.group_name} created.` });
      } else {
        res.status(400).send({
          error: { message: `Missing ${field} is required` },
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        error: { message: error.message },
      });
    });
});

module.exports = groupsRouter;
