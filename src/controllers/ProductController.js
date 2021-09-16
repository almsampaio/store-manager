const ProductService = require('../services/ProductService');

const { HTTP_STATUS_CREATED,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} = require('../config/httpStatus');

const create = async (request, response) => {
  const { name, quantity } = request.body;

  try {
    const productRegistered = await ProductService.register(name, quantity);
    response.status(HTTP_STATUS_CREATED).json(productRegistered);
  } catch (error) {
    const err = {
      code: 'invalid_data',
      message: error.message,
    };
    response.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ err });
  }
};

module.exports = {
  create,
};
