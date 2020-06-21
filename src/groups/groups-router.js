const express = require("express");
const xss = require("xss");
const GroupsService = require("./groups-service");

const groupsRouter = express.Router();

const serializeGroup = (group) => ({
  id: group.id,
  group_name: xss(group.group_name),
  pitch: xss(group.pitch),
  group_leader: group.group_leader,
  phone: xss(group.phone_number),
  group_location: xss(group.group_location),
  time_date: xss(group.time_date),
  more_info: xss(group.more_info),

});

groupsRouter.route('/creategroup').post((req, res, next) => {
const knexInstance = req.app.get("db");
const { } = req.body;

})