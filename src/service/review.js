const { dbTransaction } = require("../util/mysql");

async function GetReviews(conn, isLogin) {
  const query = () => {
    if (isLogin) return "select * from reviews";
    return "select * from reviews where is_active = true"
  }
  return await dbTransaction(conn, query());
}

async function GetBestReviews(conn) {
  return await dbTransaction(conn, "select name,message from reviews where is_active = true ORDER BY rating DESC LIMIT 5");
}


async function SaveReview(conn, obj) {
  return await dbTransaction(conn, "insert into reviews set ?", obj);
}

async function GetReviewById(conn, id) {
  const data = await dbTransaction(conn, `select * from reviews where id = ?`, [id]);
  if (data && data.length == 1) {
    return data[0];
  }
  return null;
}

async function UpdateReviewById(conn, obj, id) {
  return await dbTransaction(conn, "update reviews set ? where id = ?", [obj, id]);
}

module.exports = {
  GetReviews,
  GetBestReviews,
  SaveReview,
  GetReviewById,
  UpdateReviewById
}