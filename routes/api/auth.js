const express = require("express");
const authRouter = express.Router();

const {
  authenticate,
  validateBody,

} = require("./../../middlewares/index");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserInfo,

} = require("./../../controllers/auth");

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



module.exports = authRouter;
