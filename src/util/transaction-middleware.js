const { conn } = require("./mysql");

const transaction = async (req, res, next) => {
  try {
    const connection = await conn();
    req.connection = connection;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Database error occured",
      error
    })
  }
}

module.exports = transaction;