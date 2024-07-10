const { conn } = require("./mysql");

const transaction = async (req, res, next) => {
  const connection = await conn();
  req.connection = connection;
  next();
}

module.exports = transaction;