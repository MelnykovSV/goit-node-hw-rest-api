const { HttpError } = require("../../helpers/index");

const bcrypt = require("bcrypt");
const { User } = require("../../models/auth");
const { generateToken } = require("../../helpers/tokenHandlers");

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

module.exports = loginUser;
