const express = require("express");
const xss = require("xss");
const GroupsService = require("./groups-service");

const groupsRouter = express.Router();

const serializeGroup = (group) => ({
  id: group.id,
  group_name: xss(group.group_name),
  pitch: xss(group.pitch),
  leader_phone: xss(group.leader_phone),
  group_location: xss(group.group_location),
  time_date: xss(group.time_date),
  more_info: xss(group.more_info),

});

groupsRouter.route('/').get((req, res, next) => {
  const knexInstance = req.app.get("db");
  console.log(req.app.get("db"));
  GroupsService.getAllGroups(knexInstance)
    .then((groups) => {
      res.json(groups.map(serializeGroup));
    })
    .catch(next);
})

groupsRouter.route('/creategroup').post((req, res, next) => {
const knexInstance = req.app.get("db");
const { group_name, pitch, leader_phone, group_location, time_date, more_info } = req.body;
let groupData = { group_name, pitch, leader_phone, group_location, time_date, more_info }
GroupsService.addGroup(knexInstance, groupData)
.then((groups) => {
  console.log(groups);
  res.status(201).json({ message: 'Group created successfully!'})
})
.catch((error) => {
  console.log(error);
});
})

module.exports = groupsRouter