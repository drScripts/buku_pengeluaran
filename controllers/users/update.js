const { request, response } = require("express");
const Joi = require("joi");
const {
  cloudinarySendImage,
  cloudinaryDeleteResources,
  getCloudinaryPublicId,
} = require("../../helpers");
const { User, UserProfile } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      fullName: Joi.string(),
      phoneNumber: Joi.string(),
      profession: Joi.string(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { fullName, phoneNumber, profession } = req.body;
    const { id } = req.user;
    const file = req.file;

    let urlProfile;

    const user = await User.findByPk(id, {
      include: ["profile"],
    });

    if (!user)
      return res.status(404).json({
        status: "error",
        message: "Not found!",
      });

    if (file) {
      if (user.profile.profile)
        cloudinaryDeleteResources(getCloudinaryPublicId(user.profile.profile));

      const response = await cloudinarySendImage(file);
      urlProfile = response.secure_url;
    }

    await user.update({
      fullName,
    });

    await UserProfile.update(
      { phoneNumber, profession, profile: urlProfile },
      {
        where: {
          userId: id,
        },
      }
    );

    const newUser = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
      include: ["profile"],
    });

    return res.status(200).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
