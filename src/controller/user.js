const catchAsync = require("../util/catch-async");

exports.login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (username == process.env.LOGIN_EMAIL && password == process.env.LOGIN_PWD) {
    return res.json({
      message: "Logged in successfully",
      isLogin: true
    })
  }
  return res.status(401).json({
    message: "Invalid credentials found"
  });
});