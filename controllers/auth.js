const { ctrlWrapper, HttpError } = require("./../helpers/index");
const bcrypt = require("bcrypt");
const { User } = require("./../models/auth");
const { generateToken } = require("../helpers/tokenHandlers");
// require("dotenv").config();

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const { userName, subscription, _id } = await User.create({
    ...req.body,
    password: hashPassword,
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
  const { _id, email, subscription, userName, password } = user;

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

  const { email, subscription, userName } = user;

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Current user data",
    data: {
      user: {
        userName,
        email,
        subscription,
      },
    },
  });
};

const updateUserInfo = async (req, res) => {
  const user = req.user;

  const { subscription } = req.body;

  const response = await User.findByIdAndUpdate(
    user._id,
    { subscription },
    { new: true }
  );

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

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserInfo: ctrlWrapper(updateUserInfo),
};
