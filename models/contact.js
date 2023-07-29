const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("./../helpers/index");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /^[A-Za-z\s]{3,20}$/,
    },
    email: {
      type: String,
      required: true,
      match: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^\(\d{3}\) \d{3}-\d{4}$/,
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactJoiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z\s]+$/, "numbers")
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/, "numbers")
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean(),
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactJoiSchema, updateFavoriteJoiSchema };
