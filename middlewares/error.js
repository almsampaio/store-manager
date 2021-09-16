const error = (msg) => ({
    err: {
      code: 'invalid_data',
      message: msg,
    },
  });

module.exports = { error }; 