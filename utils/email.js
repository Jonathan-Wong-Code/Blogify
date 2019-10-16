const nodemailer = require("nodemailer");

const sendEmail = async options => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "db35c8379b254d",
      pass: "3f1a5e5b2b8752"
    }
  });

  const mailOptions = {
    from: "Jonathan <jonathanwongcodes@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
