const { dbTransaction } = require("../util/mysql");

async function GetHomeStats(conn) {
  const data = await dbTransaction(conn, `select * from home_stats where id = 1`);
  if (data && data.length == 1) {
    return data[0];
  }
  return null;
}

async function UpdateHomeStats(conn, obj) {
  return await dbTransaction(conn, "update home_stats set ? where id = 1", obj);
}

module.exports = {
  GetHomeStats,
  UpdateHomeStats
}