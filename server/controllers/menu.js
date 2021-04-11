const menu = require("../models/menu");
const Menu = require("../models/menu");

function addMenu(req, res) {
  const { title, url, order, active } = req.body;
  const menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;

  menu.save((err, createMenu) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!createMenu) {
        res.status(404).send({ message: "Error to create menu" });
      } else {
        res.status(200).send({ message: "Menu created" });
      }
    }
  });
}

function getMenu(req, res) {
  const { id } = req.params;

  menu.findById({ _id: id }, (err, menuData) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!menuData) {
        res.status(404).send({ message: "Menu doesnt found" });
      } else {
        res.status(200).send({ menu: menuData });
      }
    }
  });
}

function getMenus(req, res) {
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menusData) => {
      if (err) {
        res.status(500).send({ message: "Server error" });
      } else {
        if (!menusData) {
          res.status(404).send({ message: "Menus dont found" });
        } else {
          res.status(200).send({ menu: menusData });
        }
      }
    });
}

module.exports = {
  addMenu,
  getMenu,
  getMenus,
};
