const { createTransport } = require("nodemailer");
let transporter = createTransport({
  service: "gmail",
  auth: {
    user: "salman.faris.siddiq@gmail.com",
    pass: "zipfgcdqxxoudkax",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
