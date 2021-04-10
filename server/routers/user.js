const express = require("express");
const UserController = require("../controllers/user");
const AuthController = require("../controllers/auth");
const md_auth = require("../middlewares/authenticated");
const multipart = require("connect-multiparty");

const api = express.Router();

const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers); // Only users with correct token can get users
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive); // Only users with correct token can get users
api.post("refresh-access-token", AuthController.refreshAccessToken);
api.put(
  "/upload-avatar/:id",
  [md_auth.ensureAuth, md_upload_avatar],
  UserController.uploadAvatar
);
api.get("/get-avatar/:avatarName", UserController.getAvatar);
api.put("/user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put(
  "/activate-user/:id",
  [md_auth.ensureAuth],
  UserController.activateUser
);
api.delete("/user/:id", [md_auth.ensureAuth], UserController.deleteUser);

module.exports = api;
