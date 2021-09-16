const ProductService = require('../services/ProductService');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNPROCESSABLE_ENTITY,
} = require('../config/httpStatus');

const listAll = async (request, response) => {
  const products = await ProductService.listAll();
  return response.status(HTTP_STATUS_OK).json({ products });
};

const findById = async (request, response) => {
  const { id } = request.params;

  try {
    const product = await ProductService.findById(id);
    return response.status(HTTP_STATUS_OK).json(product);
  } catch (error) {
    const err = {
      code: 'invalid_data',
      message: error.message,
    };
    return response.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ err });
  }
};

const create = async (request, response) => {
  const { name, quantity } = request.body;

  try {
    const productRegistered = await ProductService.register(name, quantity);
    return response.status(HTTP_STATUS_CREATED).json(productRegistered);
  } catch (error) {
    const err = {
      code: 'invalid_data',
      message: error.message,
    };
    return response.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ err });
  }
};

module.exports = {
  listAll,
  findById,
  create,
};
