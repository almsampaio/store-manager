function nameLengthValidation(name) {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be ate least 5 characters long',
      },
    };
  }
  return false;
}

module.exports = nameLengthValidation;
