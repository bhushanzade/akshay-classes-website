const SendEmail = require("./util")

exports.contactMessage = (req, res) => {
  const obj = {
    to: "bhushanzade50@gmail.com",
    subject: "Contact form",
    template: `
      <table>
        <tr>
          <td>Name</td>
          <td>Bhushan Zade</td>
        </tr>
        <tr>
          <td>Mobile</td>
          <td>8329042250</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>bhushanzade50@gmail.com</td>
        </tr>
        <tr>
          <td>Message</td>
          <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est maxime adipisci incidunt voluptatum pariatur. Officia
          eaque ipsum ducimus.</td>
        </tr>
      </table>
    `
  }
  SendEmail(obj)

}