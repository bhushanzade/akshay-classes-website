const mysql = require('promise-mysql');

const conn = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'akshay_classes'
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