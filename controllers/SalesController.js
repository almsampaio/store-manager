const SalesService = require('../services/SalesService');

const create = async (req, res) => {
  const { productId, quantity } = req.body;

  const sales = { productId, quantity };

  const newSales = await SalesService.create(sales);

  // console.log(newSales);

  if (newSales.err) return res.status(422).json(newSales);

  res.status(200).json(newSales);
};

module.exports = { 
  create,
};