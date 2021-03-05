const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");

function refreshAccessToken(req, res) {}

module.exports = {
  refreshAccessToken,
};
