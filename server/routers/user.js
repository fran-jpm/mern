const express = require("express");
const UserController = require("../controllers/user");
const AuthController = require("../controllers/auth");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers); // Only users with correct token can get users
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive); // Only users with correct token can get users
api.post("refresh-access-token", AuthController.refreshAccessToken);

module.exports = api;
