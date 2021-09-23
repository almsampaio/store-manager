const { create } = require('../models/Sales');

const createSales = async (req, res) => {
  const { productId, quantity } = req.body;
  const sale = await create(productId, quantity);

  res.status(200).json(sale);
};

module.exports = {
  createSales,
};