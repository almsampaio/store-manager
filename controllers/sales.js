const salesServices = require('../services/sales');

const createSales = async (req, res) => {
  const itensSold = req.body;

  const { error, result } = await salesServices.createSales(itensSold);

  if (error) return res.status(422).json(error);
  
  return res.status(200).json(result);
};

module.exports = {
  createSales,
};
