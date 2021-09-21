const { create, getAll, getById, updateSale, deleted } = require('../services/Sales');

const HTTP_UNPROCESSABLE_STATUS = 422;
const HTTP_NOT_FOUND_STATUS = 404;
// const HTTP_CREATED_STATUS = 201;
const HTTP_OK_STATUS = 200;

const createSales = async (request, response) => {
  const sale = request.body;
  // console.log(sale);
  const validyValues = await create(sale);
  if (validyValues.err) return response.status(HTTP_UNPROCESSABLE_STATUS).json(validyValues);
  return response.status(HTTP_OK_STATUS).json(validyValues);
};

const getAllSales = async (_request, response) => {
  const validyValues = await getAll();
  // if (validyValues.err) return response.status(HTTP_UNPROCESSABLE_STATUS).json(validyValues);
  return response.status(HTTP_OK_STATUS).json({ sales: validyValues });
};

const getSaleById = async (request, response) => {
  const { id } = request.params;
  const validyValues = await getById(id);
  if (validyValues.err) return response.status(HTTP_NOT_FOUND_STATUS).json(validyValues);
  return response.status(HTTP_OK_STATUS).json(validyValues);
};

const setSale = async (request, response) => {
  const { id } = request.params;
  const sale = request.body;
  const validyValues = await updateSale(id, sale);
  if (validyValues.err) return response.status(HTTP_UNPROCESSABLE_STATUS).json(validyValues);
  return response.status(HTTP_OK_STATUS).json(validyValues);
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;
  const validyValues = await deleted(id);
  if (validyValues.err) return response.status(HTTP_UNPROCESSABLE_STATUS).json(validyValues);
  return response.status(HTTP_OK_STATUS).json(validyValues);
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  setSale,
  deleteProduct,
};
