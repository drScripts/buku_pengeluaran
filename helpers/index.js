const {
  jwtSecret,
  jwtExpired,
  cloudinaryApiKey,
  cloudinaryCloudName,
  cloudinaryApiSecret,
  cloudinaryIsSecure,
} = require("../config");
const { sign } = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  api_key: cloudinaryApiKey,
  cloud_name: cloudinaryCloudName,
  api_secret: cloudinaryApiSecret,
  secure: cloudinaryIsSecure,
});

const getJwtToken = (data) => {
  return sign(data, jwtSecret, {
    expiresIn: jwtExpired,
  });
};

/**
 *
 * @param {Express.Multer.File} file
 * @param {string} folderPath
 * @returns {Promise<import("cloudinary").UploadApiResponse>}
 */
const cloudinarySendImage = async (
  file,
  folderPath = "/profileBukuKeuangan"
) => {
  return await cloudinary.uploader.upload(file.path, {
    resource_type: "image",
    folder: folderPath,
  });
};

/**
 *
 * @param {string} urlPath
 * @returns {void}
 */
const getCloudinaryPublicId = (urlPath) => {
  const path = urlPath.split("/");
  const fileName = path[path.length - 1].replace(
    /.(jpg|jpeg|gif|png|jfif|pjp|svg)/i,
    ""
  );
  return path[path.length - 2] + "/" + fileName;
};

/**
 *
 * @param {string} publicId
 */
const cloudinaryDeleteResources = (publicId) => {
  cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};

module.exports = {
  getJwtToken,
  cloudinarySendImage,
  getCloudinaryPublicId,
  cloudinaryDeleteResources,
};
