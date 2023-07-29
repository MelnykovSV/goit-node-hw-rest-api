const { ctrlWrapper, HttpError, sendEmail } = require("./../helpers/index");
const path = require("path");
const bcrypt = require("bcrypt");
const { User } = require("./../models/auth");
const { generateToken } = require("../helpers/tokenHandlers");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../", "public/", "avatars");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

require("dotenv").config();

const { BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const verificationCode = nanoid();

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const { userName, subscription, _id } = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
    avatarURL,
  });

  const token = generateToken(_id);
  await User.findByIdAndUpdate(_id, {
    token,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    message: "New user created",
    data: {
      token: token,
      user: {
        userName,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

const loginUser = async (req, res) => {
  const { email: loginEmail, password: loginPassword } = req.body;

  const user = await User.findOne({
    email: loginEmail,
  });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
  const { _id, email, subscription, userName, password, avatarURL } = user;

  console.log(loginPassword);
  console.log(password);

  const isPasswordCorrect = await bcrypt.compare(loginPassword, password);

  if (!isPasswordCorrect) {
    throw HttpError(401, "Email or password invalid");
  }

  const token = generateToken(_id);
  await User.findByIdAndUpdate(_id, {
    token,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "User signed in",
    data: {
      token: token,
      user: {
        userName,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    token: "",
  });
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Logout success",
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  const { email, subscription, userName, avatarURL } = user;

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Current user data",
    data: {
      user: {
        userName,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

const updateUserInfo = async (req, res) => {
  const user = req.user;

  const { subscription } = req.body;

  const response = await User.findByIdAndUpdate(user._id, { subscription });

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "User info updated",
    data: response,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  // await fs.rename(tempUpload, resultUpload);

  Jimp.read(tempUpload, (err, avatar) => {
    if (err) throw err;
    avatar
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(resultUpload); // save
  });
  await fs.unlink(tempUpload);

  const avatarURL = path.join("avatars", filename);

  const a = await User.findByIdAndUpdate(_id, { avatarURL });
  console.log(a);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "User info updated",
    data: { avatarURL },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, "Email not found or verification code is outdated");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Email verified",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(401, "Email already verified");
  }

  const verificationCode = nanoid();

  await User.findOneAndUpdate({ email }, { verificationCode });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verify email sent successfuly",
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserInfo: ctrlWrapper(updateUserInfo),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
