const userNameRegexp = /^[a-zA-Z0-9_]{3,30}$/;

const passwordRegexp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

module.exports = {
  userNameRegexp,
  passwordRegexp,
};
