const { User } = require("../../models/auth");

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

module.exports = logoutUser;
