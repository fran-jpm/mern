const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");

const allowedExtension = ["png", "jpg"];

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

function getUsers(req, res) {
  User.find((err, users) => {
    if (!users) {
      res.status(404).send({ message: "Users dont found" });
    } else {
      res.status(200).send({ users });
    }
  });
}

function getUsersActive(req, res) {
  const query = req.query;
  User.find({ active: query.active }, (err, users) => {
    if (!users) {
      res.status(404).send({ message: "Users dont found" });
    } else {
      res.status(200).send({ users });
    }
  });
}

function uploadAvatar(req, res) {
  const params = req.params;
  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userData) {
        res.status(404).send({ message: "User doesnt found" });
      } else {
        let user = userData;
        if (req.files) {
          // path: 'uploads/avatar/xXX8ZVBS75W7n4xRXuuRNdXf.jpg'
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileName = fileSplit[2];

          let extensionSplit = fileName.split(".");
          let fileExtension = extensionSplit[1];

          if (!allowedExtension.includes(fileExtension)) {
            res
              .status(400)
              .send({ message: "Extension is not valid (Only PNG and JPG)" });
          } else {
            user.avatar = fileName;

            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (error, userRes) => {
                if (error) {
                  res.status(500).send({ message: "Server error" });
                } else {
                  if (!userRes) {
                    res.status(404).send({ message: "User doesnt found" });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!stats) {
        res.status(404).send({ message: "avatar doesnt exists" });
      } else {
        res.sendFile(path.resolve(filePath));
      }
    }
  });
}

function updateUser(req, res) {
  const userId = req.params.id;
  let userDataBody = req.body;
  userDataBody.email = req.body.email.toLowerCase();

  User.findByIdAndUpdate({ _id: userId }, userDataBody, (error, userRes) => {
    if (error) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (!userRes) {
        res.status(404).send({ message: "User doesnt found" });
      } else {
        res.status(200).send({ user: userDataBody });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
};
