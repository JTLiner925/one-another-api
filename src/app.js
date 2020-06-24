require("dotenv").config();
const bodyparser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./users/users-router.js");
const groupsRouter = require("./groups/groups-router.js");
const eventsRouter = require("./events/events-router.js");
const app = express();
const isAuth = require("./middleware/auth");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(bodyparser.json());
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

// app.get('/api/*', (req, res) => {
//   res.json({ok: true});
// });

app.use("/api/users", usersRouter);
app.use(isAuth)
app.use("/api/groups", groupsRouter);
app.use("/api/events", eventsRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
