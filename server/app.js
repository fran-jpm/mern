const express = require("express");
const bodyarser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//LOAD routings

app.use(bodyarser.urlencoded({ extended: false }));
app.use(bodyarser.json());

// Configure Heeader HTTP

// Router Basic

module.exports = app;
