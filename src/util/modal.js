exports.regex = {
  url: /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]+\/?$/,
  baseUrl: /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]+?$/,
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/,
  strongPasswordRegx: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{8,}$/,
  mobile: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
}