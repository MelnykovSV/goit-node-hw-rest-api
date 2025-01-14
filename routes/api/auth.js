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
  verifyEmail,
  resendVerifyEmail,
} = require("./../../controllers/auth");

const {
  registerJoiSchema,
  loginJoiSchema,
  updateUserJoiSchema,
  emailJoiSchema,
} = require("./../../schemas/auth");

authRouter.post("/register", validateBody(registerJoiSchema), registerUser);
authRouter.get("/verify/:verificationCode", verifyEmail);
authRouter.post("/verify/", validateBody(emailJoiSchema), resendVerifyEmail);
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
