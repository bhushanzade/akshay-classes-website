const mysql = require('promise-mysql');

const conn = async () => {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  });
}


// conn.connect((err) => {
//   if (!err) console.log('DB Connected...');
//   else console.log('DB not connected \n Error: ' + JSON.stringify(err));
// })

const db = async (query, data) => {
  const connection = await conn();
  return connection.query(query, data);
};

const dbTransaction = async (connection, query, data) => {
  return connection.query(query, data);
}

module.exports = {
  db,
  dbTransaction,
  conn
};