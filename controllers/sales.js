const salesServices = require('../services/sales');

const createSales = async (req, res) => {
  const itensSold = req.body;

  const [result] = await salesServices.createSales(itensSold);
  
  return res.status(200).json(result);
};

module.exports = {
  createSales,
};
