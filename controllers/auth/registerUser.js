const { HttpError } = require("../../helpers/index");
const bcrypt = require("bcrypt");
const { User } = require("../../models/auth");
const { generateToken } = require("../../helpers/tokenHandlers");

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

module.exports = registerUser;
