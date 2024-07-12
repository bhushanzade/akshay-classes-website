const { SaveContactMessage, GetContactMessages } = require("../service/contact");
const catchAsync = require("../util/catch-async");
const SendEmail = require("../util/send-mail")

exports.createContactMessage = catchAsync(async (req, res) => {
  await req.connection.beginTransaction();
  await SaveContactMessage(req.connection, req.body);
  await req.connection.commit();

  await SendEmail({
    to: process.env.SELF_EMAIL,
    subject: "Contact Form",
    template: 'contact-form',
    context: req.body
  });

  await SendEmail({
    to: req.body.email,
    subject: "Thank You for Contacting Us",
    template: 'contact-thanks',
    context: req.body
  });

  return res.json({
    message: "Message has been sent successfully."
  });

})


exports.getContacts = catchAsync(async (req, res) => {
  const { isLogin } = req.query;
  if (!!isLogin != true) {
    return res.status(404).json({
      message: "Page not found"
    })
  }
  const items = await GetContactMessages(req.connection);
  return res.json(items);
});