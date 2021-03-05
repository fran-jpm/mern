const express = require("express");
const UserController = require("../controllers/user");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.post("refresh-access-token", AuthController.refreshAccessToken);

module.exports = api;
