const express = require('express');
const { contactMessage, createContactMessage } = require('./controller/contact');
const transaction = require('./util/transaction-middleware');
const { contactMessageValidation } = require('./validations/contact');
const validation = require('./validations/validation');
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Website running")
})

// router.get("/contact", contactMessage);

router.post('/contact', validation(contactMessageValidation), transaction, createContactMessage)

module.exports = router;