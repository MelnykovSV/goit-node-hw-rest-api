const { HttpError, sendEmail } = require("../../helpers/index");

const { User } = require("../../models/auth");

const { nanoid } = require("nanoid");

require("dotenv").config();

const { BASE_URL } = process.env;

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

module.exports = resendVerifyEmail;
