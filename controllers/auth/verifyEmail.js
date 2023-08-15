const { HttpError } = require("../../helpers/index");

const { User } = require("../../models/auth");

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

module.exports = verifyEmail;
