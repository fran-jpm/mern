const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");

function signUp(req, res) {
  const user = new User();

  const { email, password, repeatPassword, name, lastname } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = "admin";
  user.active = false;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Password mandatory" });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Password not are the same" });
    } else {
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error encript password" });
        } else {
          user.password = hash;

          user.save((error, userStored) => {
            if (error) {
              res.status(500).send({ message: "User exists" });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "Error created user" });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
      //   res.status(200).send({ message: "User OK" });
    }
  }
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "User doesnt exists" });
      } else {
        bcrypt.compare(password, userStored.password, (error, check) => {
          if (error) {
            res.status(500).send({ message: "Server error" });
          } else if (!check) {
            res.status(404).send({ message: "Password incorrect" });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "User is not active" });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
};
