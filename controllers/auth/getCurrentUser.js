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

module.exports = getCurrentUser;
