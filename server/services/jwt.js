const jwt = require("jwt-simple");
const moment = require("moment");

// Generate access token
const SECRET_KEY = "1234567890asdfghjkl";

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    expirate: moment().add(3, "hours").unix(), // token expira en 3 horas
  };

  return jwt.encode(payload, SECRET_KEY);
};

// Create refresh token (Reiniciar siempre que el access token esté activo)
exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    expirate: moment().add(30, "days").unix(), //Expira en 30 dias
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.decodedToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
