const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY = "1234567890asdfghjkl";
// Only users with correct token can get users
exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "Req has not header authentication" });
  }

  const token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    var payload = jwt.decode(token, SECRET_KEY);
    if (payload.exp <= moment.unix()) {
      return res.status(404).send({ message: "Token has expired" });
    }
  } catch (err) {
    // console.log(err);
    return res.status(404).send({ message: "Token is invalid" });
  }

  req.user = payload;
  next(); // Return next function
};
