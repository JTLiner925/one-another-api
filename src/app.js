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
const app = express();


const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(bodyparser.json());
app.use(morgan(morganOption));
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(helmet());

// app.get('/api/*', (req, res) => {
//   res.json({ok: true});
// });
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/users", usersRouter);
app.use(isAuth);
app.use("/api/groups", groupsRouter);
app.use("/api/events", eventsRouter);

app.use(errorHandler)

module.exports = app;
