const { create, getAll } = require('../services/Sales');

const HTTP_UNPROCESSABLE_STATUS = 422;
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

module.exports = {
  createSales,
  getAllSales,
};
