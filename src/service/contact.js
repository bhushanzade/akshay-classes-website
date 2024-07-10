const { db, dbTransaction } = require("../util/mysql");

async function GetContactMessages(conn) {
  return await dbTransaction(conn, "select * from contacts");
}

async function SaveContactMessage(conn, obj) {
  return await dbTransaction(conn, "insert into contacts set ?", obj);
}

module.exports = {
  GetContactMessages,
  SaveContactMessage
}