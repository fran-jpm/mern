const express = require("express");
const MenuController = require("../controllers/menu");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-menu", [md_auth.ensureAuth], MenuController.addMenu);
api.get("/menu/:id", [md_auth.ensureAuth], MenuController.getMenu);
api.get("/menus", [md_auth.ensureAuth], MenuController.getMenus);
api.put("/menu/:id", [md_auth.ensureAuth], MenuController.updateMenu);

module.exports = api;
