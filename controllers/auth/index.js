const { ctrlWrapper } = require("../../helpers/index");
require("dotenv").config();

const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateUserInfo = require("./updateUserInfo");
const updateAvatar = require("./updateAvatar");

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUserInfo: ctrlWrapper(updateUserInfo),
  updateAvatar: ctrlWrapper(updateAvatar),
};
