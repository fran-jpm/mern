const express = require("express");

const app = express();
const { API_VERSION } = require("./config");

//LOAD routings
const userRoutes = require("./routers/user");
const menuRouter = require("./routers/menu");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure Heeader HTTP
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRouter);

module.exports = app;
