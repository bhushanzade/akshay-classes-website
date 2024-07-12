const { regex } = require("../util/modal");

exports.reviewValidation = [
  {
    name: "name",
    rules: {
      trim: true,
      required: { message: "Full name is required" },
    }
  },
  {
    name: "email",
    rules: {
      trim: true,
      required: { message: "Email id is required" },
      email: { message: "Email must be valid email address" }
    }
  },
  {
    name: "mobile",
    rules: {
      trim: true,
      required: { message: "Mobile number is required" },
      pattern: {
        value: regex.mobile,
        message: "Mobile number is invalid"
      }
    }
  },
  {
    name: "message",
    rules: {
      trim: true,
      required: { message: "Message is required" },
    }
  },
  {
    name: "rating",
    rules: {
      min: 1,
      max: 5,
      required: { message: "Rating is required" },
    }
  },
]