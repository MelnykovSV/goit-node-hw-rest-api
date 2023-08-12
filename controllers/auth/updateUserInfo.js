const { HttpError } = require("../../helpers/index");
const { User } = require("../../models/auth");

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
    data: { subscription },
  });
};

module.exports = updateUserInfo;
