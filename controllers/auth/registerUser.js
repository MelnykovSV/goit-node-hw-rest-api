const { HttpError, sendEmail } = require("../../helpers/index");
const bcrypt = require("bcrypt");
const { User } = require("../../models/auth");
const { generateToken } = require("../../helpers/tokenHandlers");
const gravatar = require("gravatar");
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

module.exports = registerUser;
