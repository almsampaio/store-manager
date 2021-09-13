const salesServicer = require('../services/salesService');

const createSale = async (req, res) => {
  const { productId, quantity } = req.body;
  const createdSale = await salesServicer.createSale(productId, quantity);
  return res.status(200).json(createdSale);
};

module.exports = {
  createSale,
};
