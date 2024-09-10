const { GetHomeStats, UpdateHomeStats } = require("../service/home-stats");
const catchAsync = require("../util/catch-async");

exports.getHomeStats = catchAsync(async (req, res) => {
  const item = await GetHomeStats(req.connection);
  return res.json(item);
});

exports.updateHomeStat = catchAsync(async (req, res) => {
  await req.connection.beginTransaction();
  await UpdateHomeStats(req.connection, req.body);
  await req.connection.commit();
  return res.json({
    message: "Stats updated successfully."
  });

});