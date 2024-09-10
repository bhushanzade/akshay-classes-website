const express = require('express');
const { createContactMessage, getContacts } = require('./controller/contact');
const transaction = require('./util/transaction-middleware');
const { contactMessageValidation } = require('./validations/contact');
const validation = require('./validations/validation');
const { reviewValidation } = require('./validations/review');
const { saveReview, getBestReviews, getReviews, statusChangeReview } = require('./controller/reviews');
const { login } = require('./controller/user');
const { getHomeStats, updateHomeStat } = require('./controller/home-stats');
const { homeStatValidation } = require('./validations/home-stat');
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Website running")
})

router.get('/contacts', transaction, getContacts);
router.get("/review", transaction, getReviews);
router.get("/review/best", transaction, getBestReviews);
router.get("/adminhomestats", transaction, getHomeStats);


router.post('/contact', validation(contactMessageValidation), transaction, createContactMessage);
router.post('/review', validation(reviewValidation), transaction, saveReview);
router.post('/login', transaction, login)

router.put('/review/status/:id', transaction, statusChangeReview);
router.put("/adminhomestats/update", validation(homeStatValidation), transaction, updateHomeStat);



module.exports = router;