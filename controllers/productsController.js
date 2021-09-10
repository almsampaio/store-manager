const productsService = require('../services/productsService');
const httpStatus = require('../httpStatus');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productsService.create(name, quantity);
  
  if (!result.err) return res.status(httpStatus.HTTP_CREATED_SUCCESS).json(result);
  res.status(httpStatus.HTTP_INVALID_DATA).json(result.err);
};

module.exports = {
  create,
};
