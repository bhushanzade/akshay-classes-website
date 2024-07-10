const { GetContactMessages, SaveContactMessage } = require("../service/contact");
const catchAsync = require("../util/catch-async");
const { conn } = require("../util/mysql");
const SendEmail = require("../util/send-mail")

exports.createContactMessage = catchAsync(async (req, res) => {
  await req.connection.beginTransaction();
  await SaveContactMessage(req.connection, req.body);
  await req.connection.commit();
  return res.json({
    message: "Message has been sent successfully. "
  });

  // const obj = {
  //   to: "bhushanzade50@gmail.com",
  //   subject: "Contact form",
  //   template: `
  //     <table>
  //       <tr>
  //         <td>Name</td>
  //         <td>Bhushan Zade</td>
  //       </tr>
  //       <tr>
  //         <td>Mobile</td>
  //         <td>8329042250</td>
  //       </tr>
  //       <tr>
  //         <td>Email</td>
  //         <td>bhushanzade50@gmail.com</td>
  //       </tr>
  //       <tr>
  //         <td>Message</td>
  //         <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est maxime adipisci incidunt voluptatum pariatur. Officia
  //         eaque ipsum ducimus.</td>
  //       </tr>
  //     </table>
  //   `
  // }
  // SendEmail(obj)

})

