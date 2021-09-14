const InvalidData = (errorMessage) => {
  const objError = {
    err: {
      code: 'invalid_data',
      message: errorMessage,
    },
  };
  return objError;
};

module.exports = {
  InvalidData,
};