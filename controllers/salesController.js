const SalesService = require('../services/salesServices');
const { SUCCESS_OK } = require('../utils/HttpStatusCodes');

const create = async (req, res) => {
  const sale = req.body;
  const newSale = await SalesService.create(sale);
  return res.status(SUCCESS_OK).json(newSale);   
};

module.exports = {
  create,
};