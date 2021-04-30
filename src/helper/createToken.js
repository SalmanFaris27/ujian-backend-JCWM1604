const jwt = require("jsonwebtoken");

module.exports = {
  createAccessToken: (data) => {
    const key = "saitama";
    const token = jwt.sign(data, key, { expiresIn: "7h" });
    return token;
  },
  createTokenRefresh: (data) => {
    const key = "puripuri";
    const token = jwt.sign(data, key);
    return token;
  },
};
