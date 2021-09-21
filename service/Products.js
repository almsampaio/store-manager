const { getAllProducts } = require('../models/Products');

const INVALID_DATA = 'invalid_data';
const STATUS_HTTP_422 = 422;

const validateProduct = async (name, quantity) => {
  if (name.length < 5) {
    return (
      { err: { code: INVALID_DATA, message: '"name" length must be at least 5 characters long' }, 
      status: 422 }
     );
  }
  if (!quantity || quantity < 0) {
    return ({ err: { code: INVALID_DATA, message: '"quantity" must be larger than or equal to 1' }, 
      status: 422 }
    );
  }
  if (typeof quantity !== 'number') {
    return (
      { err: 
        { code: INVALID_DATA, message: '"quantity" must be a number' },
        status: STATUS_HTTP_422 }
    );
  }
};

const validateQuantityProduct = async (name) => {
  const products = await getAllProducts();
  const verifyExistsName = products.some((product) => product.name === name);
  
  if (verifyExistsName) {
    return ({ err: { 
      code: INVALID_DATA, 
      message: 'Product already exists' }, 
      status: STATUS_HTTP_422 });
  }
};

module.exports = {
  validateProduct,
  validateQuantityProduct,
};
