const formError = {};

export function validate(eleName, value, rules) {
  const messages = [];
  if (rules.trim === true && typeof value === 'string') {
    value = value.trim();
  }
  if (rules.required && (value === undefined || value === '')) {
    messages.push(rules.required.message || `This field is required.`);
  }
  if (rules.minLength && value) {
    if (
      rules.minLength.value &&
      rules.minLength.value.toString() &&
      Number(rules.minLength.value) > value.toString().length
    ) {
      messages.push(rules.minLength.message ||
        `This field should be at least ${rules.minLength.value ?? rules.minLength} characters long.`);
    } else if (
      !rules.minLength.value &&
      Number(rules.minLength) > value.toString().length
    ) {
      errors[field] =
        rules.minLength.message ||
        `This field should be at least ${rules.minLength.value ?? rules.minLength} characters long.`;
    }
  }
  if (
    rules.email && value && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)
  ) {
    messages.push(rules.email.message || `Email id must be a valid email address.`);
  }
  if (rules.pattern && value) {
    if (
      rules.pattern.value &&
      !new RegExp(rules.pattern.value).test(value)
    ) {
      messages.push(rules.pattern.message ||
        `This field must match the specified pattern.`);
    } else if (
      !rules.pattern.value &&
      !new RegExp(rules.pattern).test(value)
    ) {
      messages.push(rules.pattern.message ||
        `This field must match the specified pattern.`);
    }
  }
  if (rules.patterns && Array.isArray(rules.patterns) && value) {
    rules.patterns.map(pattern => {
      if (
        pattern.value &&
        !new RegExp(pattern.value).test(value)
      ) {
        messages.push(pattern.message ||
          `This field must match the specified pattern.`);
      } else if (
        !pattern.value &&
        !new RegExp(pattern).test(value)
      ) {
        messages.push(pattern.message ||
          `This field must match the specified pattern.`);
      }
    })
  }
  if (rules.matchField && value) {
    const otherEle = document.getElementById(rules.matchField.field);
    if (value != otherEle.value) {
      messages.push(rules.matchField.message);
    }
  }
  showErrors(messages, eleName);
  return formError;
}

export function showErrors(messages, eleName) {
  const errsEle = document.getElementById(eleName + "-errors");
  if (errsEle) {
    errsEle.innerHTML = "";
    if (messages.length > 0) {
      messages.map(x => {
        const ele = document.createElement("p");
        ele.style.color = "red";
        ele.innerText = x;
        errsEle.appendChild(ele);
      });
      formError[eleName] = messages;
    } else {
      delete formError[eleName];
    }
  }

}