const duplicateKeyError = (errorMessage) => {
  const match = errorMessage?.match(/index: (\w+)_\d+ dup key: { (\w+): "(.*?)" }/);
  if (match) {
    const [, indexName, keyName, keyValue] = match;
    const errors = {};
    if (!errors[keyName]) errors[keyName] = [];
    errors[keyName].push(`Duplicate ${keyName} ${keyValue} found. Please use different ${keyName}`);
    return {
      message: `Validations failed. Please add valid data.`,
      errors,
      status: 409
    };
  }
  return null;
};

const enumError = (errorMessage) => {
  const match = errorMessage?.match(/^(.*?): (.*?): `([^`]+)` is not a valid enum value for path `([^`]+)`\.$/);
  if (match) {
    const [, model, keyName, value, path] = match;
    const errors = {};
    if (!errors[keyName]) errors[keyName] = [];
    errors[keyName].push(`${value} is not a valid value for ${path}`);
    return {
      message: `Validations failed. Please add valid data.`,
      errors,
      status: 409
    };
  }
  return null;
};

function handleValidationErrors(error) {
  const enumErr = enumError(error.message);
  if (enumErr) return enumErr;
  const duplicateErr = duplicateKeyError(error.message);
  if (duplicateErr) return duplicateErr;
  // return {
  //   message: 'Database error occured. Try again later',
  //   errors: error.errors ? error.errors : error,
  //   status: 400,
  //   noToastr: true,
  // };

  if (error?.status === 401) {
    return {
      message: error.message ?? 'Invalid account found. Please logged in again.',
      status: 401,
    };
  }

  if (error?.status) {
    return {
      message: error.message ?? 'Invalid account found. Please logged in again.',
      status: error?.status,
    };
  }

  return {
    message: 'Internal server error occured. Please try again later',
    errors: error.message ?? error,
    status: 500,
  };
}

module.exports = handleValidationErrors;
