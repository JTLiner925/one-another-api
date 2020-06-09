const express = require('express')
const xss = require('xss')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonParser = express.json()

const serializeUser = user => ({
  id: user.id,
  user_email: xss(user.user_email),
  user_password: xss(user.user_password),
  first_name: xss(user.first_name),
  last_name: xss(user.last_name),
  address: xss(user.user_address),
  bio: xss(user.user_bio),
})

usersRouter
.route('/')
.get((req, res, next) => {
  
  const knexInstance = req.app.get('db')
  
  UsersService.getAllUsers(knexInstance)
  .then(users => {
    res.json(users.map(serializeUser))
  })
  .catch(next)
})

module.exports = usersRouter