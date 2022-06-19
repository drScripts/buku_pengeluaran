const { request, response } = require("express");
const { Busines } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.user;

    const business = await Busines.findAll({ where: { userId: id } });

    return res.status(200).json({
      status: "success",
      data: { business },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
