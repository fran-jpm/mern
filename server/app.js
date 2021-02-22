const express = require("express");
const bodyarser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//LOAD routings
const userRoutes = require("./routers/user");

app.use(bodyarser.urlencoded({ extended: false }));
app.use(bodyarser.json());

// Configure Heeader HTTP

// Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
