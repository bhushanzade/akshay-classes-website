const nodemail = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
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

  console.log();

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve('./src/templates/'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./src/templates/'),
  };

  mail.use('compile', hbs(handlebarOptions));

  const mailOptions = {
    from: "Akshay Classes <procodeprogramming@gmail.com>",
    to: obj.to,
    subject: obj.subject,
    template: obj.template, // 'forget_password',
    context: obj.context
  };

  return mail.sendMail(mailOptions);
}

module.exports = SendEmail;