const { createProductModel, getByName } = require('../models');
const {
  STATUS_UNPROCESSABLE_ENTITY,
  STATUS_CREATE,
} = require('../utils/status');

const createService = async (name, quantity) => {
  const findOne = await getByName(name);
  if (findOne) {
    return {
      status: STATUS_UNPROCESSABLE_ENTITY,
      message: {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      },
    };
  }

  const createProduct = await createProductModel(name, quantity);
  return {
    status: STATUS_CREATE,
    message: createProduct,
  };
};

module.exports = createService;
