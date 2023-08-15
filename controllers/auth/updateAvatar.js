const path = require("path");
const { HttpError } = require("../../helpers/index");

const { User } = require("../../models/auth");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../", "../", "public/", "avatars");
const Jimp = require("jimp");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400, "Image is required");
  }

  if (
    !req.file.originalname.endsWith(".png") &&
    !req.file.originalname.endsWith(".jpg") &&
    !req.file.originalname.endsWith(".jpeg")
  ) {
    throw HttpError(400, "Image has to be in .png or .jpg fromat");
  }

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tempUpload, (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(resultUpload); // save
  });
  await fs.unlink(tempUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "User info updated",
    data: { avatarURL },
  });
};

module.exports = updateAvatar;
