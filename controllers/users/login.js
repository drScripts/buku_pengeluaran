const { compareSync } = require("bcrypt");
const { request, response } = require("express");
const Joi = require("joi");
const { getJwtToken } = require("../../helpers");
const { User } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Your email must be an active email!",
        "any.required": "Please insert your email!",
      }),
      password: Joi.string().required().messages({
        "any.required": "Please insert your password!",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: ["profile"] });

    if (!user)
      return res.status(400).json({
        status: "error",
        message: "Wrong email or password!",
      });

    const isValidPassword = compareSync(password, user.password);

    if (!isValidPassword)
      return res.status(400).json({
        status: "error",
        message: "Wrong email or password!",
      });

    delete user.dataValues.password;

    const token = getJwtToken({ id: user.id });

    return res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
