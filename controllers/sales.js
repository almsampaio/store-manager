const salesService = require('../services/sales');

const createSale = async (req, res) => {
  const { itensSold } = req.body;

  const newSale = await salesService.create(itensSold);
  return res.status(201).json(newSale);
};

module.exports = {
  createSale,
};