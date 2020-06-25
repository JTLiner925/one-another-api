const express = require("express");
const xss = require("xss");
const GroupsService = require("./groups-service");
const isAuth = require("../middleware/auth");

const groupsRouter = express.Router();

const serializeGroup = (group) => ({
  id: group.id,
  group_name: xss(group.group_name),
  pitch: xss(group.pitch),
  leader_phone: xss(group.leader_phone),
  group_location: xss(group.group_location),
  time_date: xss(group.time_date),
  more_info: xss(group.more_info),
  user_ids: group.user_ids,
});

groupsRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  console.log(req.app.get("db"));
  GroupsService.getAllGroups(knexInstance)
    .then((groups) => {
      res.json(groups.map(serializeGroup));
    })
    .catch(next);
});
groupsRouter.route("/joingroup", isAuth).post((req, res, next) => {
  // console.log(req)
  const knexInstance = req.app.get("db");
  const {
    group_name,
    // pitch,
    // leader_phone,
    // group_location,
    // time_date,
    // more_info,
  } = req.body;
  let userId = req.userId;
  let groupData = {
    group_name,
    id: userId,
    // pitch,
    // leader_phone,
    // group_location,
    // time_date,
    // more_info,
    // group_leader: userId,
    user_ids: `{${userId}}`  ,
  };
  GroupsService.updateGroup(knexInstance, userId, groupData.user_ids)
    .then((groups) => {
      console.log(groups);
      res.status(201).json({ message: "Group created successfully!" });
    })
    .catch((error) => {
      console.log(error);
    });
});
groupsRouter.route("/creategroup", isAuth).post((req, res, next) => {
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
  console.log(req);
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
    .then((groups) => {
      console.log(groups);
      res.status(201).json({ message: "Group created successfully!" });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = groupsRouter;
