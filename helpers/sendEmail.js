const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

sgMail
  .send()
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.log(error.message);
  });

const sendEmail = async (data) => {
  const email = { ...data, from: "melnykov8515@gmail.com" };

  await sgMail.send(email);

  return true;
};

module.exports = sendEmail;
