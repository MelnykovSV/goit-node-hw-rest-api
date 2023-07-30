const contactNameRegexp = /^[A-Za-z\s]{3,30}$/;
const contactPhoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

module.exports = {
  contactNameRegexp,
  contactPhoneRegexp,
};

export {}