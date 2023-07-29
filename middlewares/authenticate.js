const HttpError = require("./../helpers/HttpError");
const { validateToken } = require("./../helpers/tokenHandlers");

const { User } = require("./../models/auth");
const authenticate = async (req, res, next) => {
  try {
    const [bearer = "", token = ""] = req.headers.authorization.split(" ");

    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }

    const { id } = validateToken(token);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
  
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
