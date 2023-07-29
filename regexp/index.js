const { userNameRegexp, passwordRegexp } = require("./auth");
const { emailRegexp } = require("./common");
const { contactNameRegexp, contactPhoneRegexp } = require("./contacts");

module.exports = {
  userNameRegexp,
  passwordRegexp,
  emailRegexp,
  contactNameRegexp,
  contactPhoneRegexp,
};
