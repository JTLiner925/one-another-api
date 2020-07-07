const jwt = require("jsonwebtoken");
const logger = require('../logger');

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  logger.error(`Unauthorized request to path: ${req.path}`)
  if (!authHeader) {
    const error = new Error("Not Authorized");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "djahslkdjfhalksjdfhiwuuibbvujdksjdhf");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not Authorized");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.id
  next();
};
