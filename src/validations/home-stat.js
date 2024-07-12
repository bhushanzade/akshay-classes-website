const { regex } = require("../util/modal");

exports.homeStatValidation = [
  {
    name: "years",
    rules: {
      required: { message: "Years number is required" },
    }
  },
  {
    name: "students",
    rules: {
      required: { message: "Students number is required" },
    }
  },
  {
    name: "batches",
    rules: {
      required: { message: "Batches number is required" },
    }
  },
  {
    name: "student_placed",
    rules: {
      required: { message: "Student placed number is required" },
    }
  },
]