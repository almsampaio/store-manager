const errors = require('./errors');
const productModel = require('../models/productModel');
const https = require('./HttpsStatus');

const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkProduct = async (name, quantity) => {
  if (name.length < NAME_LENGTH) {
   return {
    err: { code: 'invalid_data', message: errors.NAME }, error: 422 };
  }
  if (quantity <= INVALID_QUANTITY) {
    return { err: { code: 'invalid_data', message: errors.QUANTITY }, error: 422 };
  }
  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: errors.TYPE_NUMBER }, error: 422 };
  }

  const insertedProduct = await productModel.create(name, quantity);

  if (insertedProduct === false) {
    return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
}
  return insertedProduct;
};

module.exports = {
  checkProduct,
};
