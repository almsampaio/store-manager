const notValidId = { err: { code: 'invalid_data', message: 'Wrong id format' } };

const productExist = { err: { code: 'invalid_data', message: 'Product already exists' } };

module.exports = {
  notValidId,
  productExist,
};
