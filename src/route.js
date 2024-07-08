const express = require('express');
const { contactMessage } = require('./controller');
const router = express.Router();

router.get("/", (req, res) => {
  console.log("called");
  return res.send("Website running")
})

router.get("/contact", contactMessage)

module.exports = router;