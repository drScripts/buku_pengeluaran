const { request, response } = require("express");
const { verify } = require("jsonwebtoken");
const { jwtSecret } = require("../config");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({
      status: "error",
      message: "Unauthorized!",
    });

  try {
    const user = verify(token, jwtSecret);

    if (!user)
      return res.status(401).json({
        status: "error",
        message: "Unauthorized!",
      });
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      status: "error",
      message: err.message,
    });
  }
};
