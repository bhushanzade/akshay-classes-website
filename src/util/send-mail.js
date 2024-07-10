const nodemail = require('nodemailer');
function SendEmail(obj) {
  const mail = nodemail.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: "Contact Form <procodeprogramming@gmail.com>",
    to: obj.to,
    subject: obj.subject,
    html: obj.template,
  };

  return mail.sendMail(mailOptions);
}

module.exports = SendEmail;