require("dotenv").config();
const bodyparser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV, CLIENT_ORIGIN } = require("./config");
const isAuth = require("./middleware/auth");
const errorHandler = require('./error-handler')
const usersRouter = require("./users/users-router.js");
const groupsRouter = require("./groups/groups-router.js");
const eventsRouter = require("./events/events-router.js");
const neededRouter = require("./needed/needed-router")
const app = express();


const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(bodyparser.json());
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/users", usersRouter);
app.use(isAuth);
app.use("/api/groups", groupsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/needed", neededRouter);
app.use(errorHandler)

module.exports = app;
