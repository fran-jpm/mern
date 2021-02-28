const bcrypt = require("bcrypt-nodejs");
const User = require("../models/user");

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

          user.save((err, userStored) => {
            if (err) {
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

module.exports = {
  signUp,
};
