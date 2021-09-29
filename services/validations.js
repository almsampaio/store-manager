const validName = (name) => {
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long'
      },
    };
  }
};

module.exports = {
  validName,
};
