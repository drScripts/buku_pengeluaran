const { jwtSecret, jwtExpired } = require("../config");
const { sign } = require("jsonwebtoken");

const getJwtToken = (data) => {
  return sign(data, jwtSecret, {
    expiresIn: jwtExpired,
  });
};

module.exports = { getJwtToken };
