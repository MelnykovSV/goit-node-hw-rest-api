const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers/index");
const Joi = require("joi");

const {
  userNameRegexp,
  passwordRegexp,
  emailRegexp,
} = require("./../regexp/index");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      match: userNameRegexp,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const registerJoiSchema = Joi.object({
  userName: Joi.string()
    .pattern(
      userNameRegexp,
      "Username can contain only letters, numbers and underscores"
    )
    .required(),
  email: Joi.string().pattern(emailRegexp, "Invalid email").required(),
  password: Joi.string()
    .pattern(
      passwordRegexp,
      "Password should contain at least 1 capital letter, 1 normal letter and 1 number"
    )
    .required(),
  subscription: Joi.string(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp, "Invalid email").required(),
  password: Joi.string()
    .pattern(
      passwordRegexp,
      "Password should contain at least 1 capital letter, 1 normal letter and 1 number"
    )
    .required(),
});

const updateUserJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const emailJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp, "Invalid email").required(),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
  registerJoiSchema,
  loginJoiSchema,
  updateUserJoiSchema,
  emailJoiSchema,
};


export {}