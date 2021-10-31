const everyAsync = async (array, asyncCallback) => {
  const promises = array.map((item) => asyncCallback(item));
  const response = await Promise.all(promises);
  const result = response.every((item) => item);

  return result;
};

module.exports = {
  everyAsync,
};
