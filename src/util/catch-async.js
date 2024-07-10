const handleValidationErrors = require("./validation-error");

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(async (err) => {
    if (req.connection) {
      await req.connection.rollback();
    }
    const error = handleValidationErrors(err);
    return res.status(error.status).json(error);
  })
};

module.exports = catchAsync;
