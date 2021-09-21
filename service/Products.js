const { getAllProducts, create } = require('../models/Products');

const INVALID_DATA = 'invalid_data';
const HTTP_422 = 422;

const verifyName = (name) => {
  if (name.length < 5) {
    return (
      { err: { 
        code: INVALID_DATA,
        message: '"name" length must be at least 5 characters long',
      }, 
      status: HTTP_422,
    });
  }  
};

const verifyQuantity = (quantity) => {
  if (!quantity || quantity < 0) {
    return ({ err: { code: INVALID_DATA, message: '"quantity" must be larger than or equal to 1' }, 
      status: HTTP_422 });
  }
  if (typeof quantity !== 'number') {
    return (
      { err: { code: INVALID_DATA, message: '"quantity" must be a number' }, status: HTTP_422 });
  }
};

const validateExistisProduct = async (name) => {
  const verifyExistsName = await getAllProducts().some((product) => product.name === name);
  if (verifyExistsName) { 
    return { err: { code: INVALID_DATA, message: 'Product already exists' }, status: HTTP_422 };
  }
};

const validateProduct = async (name, quantity) => {
  const result = create(name, quantity);
  verifyName(name);
  verifyQuantity(quantity);
  validateExistisProduct(name);

  return result;
};

module.exports = {
  validateProduct,
};
