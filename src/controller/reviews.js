const { SaveReview, GetBestReviews, GetReviews, GetReviewById, UpdateReviewById } = require("../service/review");
const catchAsync = require("../util/catch-async");
const SendEmail = require("../util/send-mail");

exports.getBestReviews = catchAsync(async (req, res) => {
  const items = await GetBestReviews(req.connection);
  return res.json(items);
});

exports.getReviews = catchAsync(async (req, res) => {
  const { isLogin } = req.query;
  const items = await GetReviews(req.connection, !!isLogin);
  return res.json(items);
});

exports.saveReview = catchAsync(async (req, res) => {
  await req.connection.beginTransaction();
  await SaveReview(req.connection, req.body);

  await SendEmail({
    to: process.env.SELF_EMAIL,
    subject: "Feedback Form",
    template: 'feedback-form',
    context: req.body
  });

  await SendEmail({
    to: req.body.email,
    subject: "Thank You For Your Feedback",
    template: 'feedback-thanks',
    context: req.body
  });

  await req.connection.commit();
  return res.json({
    message: "Feedback has been sent successfully. We will review your feedback and upload it to our site."
  });

});


exports.statusChangeReview = catchAsync(async (req, res) => {
  await req.connection.beginTransaction();
  const review = await GetReviewById(req.connection, req.params.id);
  await UpdateReviewById(req.connection, { is_active: !review.is_active }, req.params.id);
  await req.connection.commit();
  return res.json({
    status: !review.is_active,
    message: "Feedback updated successfully."
  });

});