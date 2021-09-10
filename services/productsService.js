const productModel = require('../models/productsModel');
const productsMidd = require('../middlewares/productsMidd');

const create = async (name, quantity) => {
  const newProduct = await productsMidd.findDuplicated(name);

  if (name.length < 5) {
    return { err: { err: { code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' },
    } };
  }

  if (typeof quantity !== 'number') {
    return { err: { err: { code: 'invalid_data',
      message: '"quantity" must be a number' },
    } };
  }

  if (quantity <= 0) {
    return { err: { err: { code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' },
    } };
  }

  if (newProduct.length > 0) {
    return { err: { err: { code: 'invalid_data',
      message: 'Product already exists' },
    } };
  }

  const result = await productModel.create(name, quantity);
  return result;
};

module.exports = {
  create,
};
