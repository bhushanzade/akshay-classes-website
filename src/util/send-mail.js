const nodemail = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
function SendEmail(obj) {
  const mail = nodemail.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    requireTLS: process.env.EMAIL_REQUIRE_TLS,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('./src/templates/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./src/templates/'),
  };

  mail.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: obj.from + ` <${process.env.INFO_EMAIL}>`,
    to: obj.to,
    cc: obj.cc,
    subject: obj.subject,
    template: obj.template, // 'forget_password',
    context: obj.context
  };

  return mail.sendMail(mailOptions);
}

module.exports = SendEmail;