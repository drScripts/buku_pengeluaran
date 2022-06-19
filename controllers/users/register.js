const { request, response } = require("express");
const Joi = require("joi");
const { hashSync } = require("bcrypt");
const { User, UserProfile } = require("../../models");
const { getJwtToken } = require("../../helpers");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      fullName: Joi.string().required().messages({
        "any.required": "Please insert your full name!",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "User email must be an valid email!",
        "any.required": "Please insert your email!",
      }),
      password: Joi.string().min(8).required().messages({
        "string.min": "Your password length must be greather than 8 character!",
        "any.required": "Please insert your password!",
      }),
      phoneNumber: Joi.string(),
      profession: Joi.string(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { fullName, password, email, phoneNumber, profession } = req.body;

    const hashedPassword = hashSync(password, 10);

    const userCreated = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    await UserProfile.create({
      userId: userCreated.id,
      phoneNumber,
      profession,
    });

    const user = await User.findOne({
      where: { email },
      include: ["profile"],
      attributes: {
        exclude: ["password"],
      },
    });

    const token = getJwtToken({ id: userCreated.id });

    return res.send({
      status: "success",
      data: { user, token },
    });
  } catch (err) {
    if (err?.name === "SequelizeUniqueConstraintError")
      return res.status(409).json({
        status: "error",
        message: "This email has already registerd!",
      });

    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
