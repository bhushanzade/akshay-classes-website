const _ = require('lodash');

function validation(validationRules) {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const errors = {};
    const reqBodykeys = Object.keys(req.body);
    const keys = validationRules.map(x => x.name);
    const unknownProperty = [];
    reqBodykeys.forEach((key) => {
      if (!keys.includes(key)) {
        unknownProperty.push(key);
      }
    });
    if (!_.isEmpty(unknownProperty)) {
      return res.status(490).json({
        message: `Unknown property: ${unknownProperty}`,
      });
    }

    const insertError = (field, msg) => {
      if (!errors[field]) errors[field] = [];
      errors[field].push(msg);
    }

    function validateMinLength(field, value, rules) {
      if (rules.minLength && value) {
        const minLength = Number(rules.minLength.value ?? rules.minLength);
        if (minLength > value.toString().length) {
          const msg = rules.minLength.message ?? `${field} should be at least ${minLength} characters long.`;
          insertError(field, msg);
        }
      }
    }

    function validateMin(field, value, rules) {
      if (rules.min && value.toString()) {
        const minValue = Number(rules.min.value ?? rules.min);
        if (minValue > Number(value)) {
          const msg = rules.min.message ?? `Ensure the ${field} is not less than ${minValue}.`;
          insertError(field, msg);
        }
      }
    }

    function validateMaxLength(field, value, rules) {
      if (rules.maxLength && value) {
        const maxLength = Number(rules.maxLength.value ?? rules.maxLength);
        if (maxLength < value.toString().length) {
          const msg = rules.maxLength.message ?? `${field} should not exceed ${maxLength} characters.`;
          insertError(field, msg);
        }
      }
    }

    function validateMax(field, value, rules) {
      if (rules.max && value.toString()) {
        const maxValue = Number(rules.max.value ?? rules.max);
        if (maxValue < Number(value)) {
          const msg = rules.max.message ?? `Ensure the ${field} is not greater than ${maxValue}.`;
          insertError(field, msg);
        }
      }
    }

    function validatePattern(field, value, rules) {
      if (rules.pattern && value) {
        const pattern = new RegExp(rules.pattern.value ?? rules.pattern);
        if (!pattern.test(value)) {
          const msg = rules.pattern.message ?? `${field} must match the specified pattern.`;
          insertError(field, msg);
        }
      }
    }

    function validateMatchField(field, value, rules) {
      if (rules.matchField) {
        const matchField = rules.matchField.field ?? rules.matchField;
        if (value != req.body[matchField]) {
          const msg = rules.matchField.message ?? `${field} must match the with ${matchField}.`;
          insertError(field, msg);
        }
      }
    }

    function validateMultiplePattern(field, value, rules) {
      if (rules.patterns && Array.isArray(rules.patterns)) {
        rules.patterns.map(x => {
          if (x.value && value) {
            const pattern = new RegExp(x.value);
            if (!pattern.test(value)) {
              const msg = x.message ?? `${field} must match the specified pattern.`;
              insertError(field, msg);
            }
          }
        })
      }
    }

    function validateEnum(field, value, rules) {
      if (rules.enum) {
        const enumValues = rules.enum.value ?? rules.enum;
        if (Array.isArray(enumValues) && enumValues.length > 0 && !enumValues.includes(value)) {
          const msg = rules.enum.message ?? `${field} value does not match the system defined values.`;
          insertError(field, msg);
        }
      }
    }

    function validateDataType(field, value, rules) {
      if (rules.dataType && value) {
        const dataType = rules.dataType?.type || rules.dataType;
        if (dataType === Boolean) {
          if (typeof value !== 'boolean') {
            if (['false', 'true'].includes(value.toLowerCase())) {
              req.body[field] = value.toLowerCase() === 'true';
            } else if (['0', '1', 0, 1].includes(value)) {
              req.body[field] = parseInt(value, 10) === 1;
            } else {
              const msg = rules.dataType?.message ?? `${field} must have a boolean value.`;
              insertError(field, msg);
            }
          }
        } else if (dataType === Number) {
          req.body[field] = Number(value);
          if (Number.isNaN(req.body[field])) {
            const msg = rules.dataType?.message ?? `${field} only supports a number value.`;
            insertError(field, msg);
          }
        }
      }
    }

    validationRules.map(x => {
      const field = x.name;
      const rules = x.rules ?? {};
      let value = req.body[field];
      // Trim the string
      if (rules.trim === true && typeof value === 'string') {
        value = value.trim();
        req.body[field] = value;
      }

      // Required field check
      if (rules.required && (value === undefined || value === '')) {
        insertError(field, (rules.required.message ?? `${field} is required.`))
      }

      if (rules.custom && typeof (rules.custom) == "function") {
        const message = rules.custom(value)?.message;
        if (message) {
          insertError(field, (message))
        }
      }

      // Email format check using regex
      const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      if (rules.email && value && !emailRegex.test(value)) {
        insertError(field, (rules.email.message ?? `${field} must be a valid email address.`))
      }

      // Minimum string length check
      validateMinLength(field, value, rules)

      // Minimum value check
      validateMin(field, value, rules);

      // Maximum string length check
      validateMaxLength(field, value, rules)

      // Maximum value check
      validateMax(field, value, rules);

      // Custom pattern check using regex
      validateMultiplePattern(field, value, rules);
      validatePattern(field, value, rules);

      // Check Enum validation
      validateEnum(field, value, rules);

      // check datatype validation
      validateDataType(field, value, rules);

      validateMatchField(field, value, rules);
    })
    if (Object.keys(errors).length > 0) {
      return res.status(409).json({
        message: 'Validations failed. Please add valid data.',
        errors,
      });
    }

    next();
  };
}

module.exports = validation;
