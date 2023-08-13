const express = require("express");
const authRouter = express.Router();

const {
  authenticate,
  validateBody,
  upload,
} = require("./../../middlewares/index");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserInfo,
  updateAvatar,
} = require("./../../controllers/auth/index");

const {
  registerJoiSchema,
  loginJoiSchema,
  updateUserJoiSchema,
} = require("./../../schemas/auth");

authRouter.post("/register", validateBody(registerJoiSchema), registerUser);

authRouter.post("/login", validateBody(loginJoiSchema), loginUser);
authRouter.post("/logout", authenticate, logoutUser);
authRouter.get("/current", authenticate, getCurrentUser);
authRouter.patch(
  "/users",
  authenticate,
  validateBody(updateUserJoiSchema),
  updateUserInfo
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
