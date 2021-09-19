const { create, getAll } = require('../services/Products');

const HTTP_UNPROCESSABLE_STATUS = 422;
const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

const createProduct = async (request, response) => {
  const { name, quantity } = request.body;
  // console.log(name, quantity);
  const validyValues = await create(name, quantity);
  if (validyValues.err) return response.status(HTTP_UNPROCESSABLE_STATUS).json(validyValues);
  return response.status(HTTP_CREATED_STATUS).json(validyValues);
};

const getAllProducts = async (_request, response) => {
  const validyValues = await getAll();
  if (validyValues.length === 0) return response.status(HTTP_OK_STATUS).json([]);
  return response.status(HTTP_OK_STATUS).json({ products: validyValues });
};

module.exports = {
  createProduct,
  getAllProducts,
};
