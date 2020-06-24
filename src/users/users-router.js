const express = require("express");
const xss = require("xss");
const UsersService = require("./users-service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersRouter = express.Router();
// const jsonParser = express.json()

const serializeUser = (user) => ({
  id: user.id,
  user_email: xss(user.user_email),
  user_password: xss(user.user_password),
  first_name: xss(user.first_name),
  last_name: xss(user.last_name),
  address: xss(user.user_address),
  bio: xss(user.user_bio),
});

usersRouter.route("/").get((req, res, next) => {
  // res.send("Hello, node!");
  const knexInstance = req.app.get("db");
  console.log(req.app.get("db"));
  UsersService.getAllUsers(knexInstance)
    .then((users) => {
      res.json(users.map(serializeUser));
    })
    .catch(next);
});

usersRouter.route("/login").post((req, res, next) => {
  // res.send("Hello, node!");
  const knexInstance = req.app.get("db");
  const { user_email, user_password } = req.body;
  let loadedUser;
  UsersService.getByEmail(knexInstance, user_email)
    .then((user) => {
      console.log(user);
      loadedUser = user;
      return bcrypt.compare(user_password, user.user_password);
    })
    .then((matched) => {
      const token = jwt.sign(
        {
          user_email: loadedUser.user_email,
          id: loadedUser.id,
        },
        "djahslkdjfhalksjdfhiwuuibbvujdksjdhf"
      );
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log(error);
    });
});

usersRouter.route("/signup").post((req, res, next) => {
  // res.send("Hello, node!");
  const knexInstance = req.app.get("db");
  const {
    user_address,
    user_bio,
    user_email,
    user_password,
    first_name,
    last_name,
  } = req.body;
  bcrypt.hash(user_password, 12).then((hashedPassword) => {
    let userData = {
      user_address,
      user_bio,
      user_email,
      user_password: hashedPassword,
      first_name,
      last_name,
    };
    UsersService.addUser(knexInstance, userData)
      .then((users) => {
        console.log(users);
        res.status(201).json({ message: "User created successfully" });
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = usersRouter;
