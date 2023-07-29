const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const generateToken = (id) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

const validateToken = (token) => {
  const result = jwt.verify(token, SECRET_KEY);
  return result;
};

module.exports = { generateToken, validateToken };
