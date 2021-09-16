const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const itensSold = req.body; 

  const { sales, message, status } = await salesService.addSale(itensSold);

  if (!sales) return res.status(status).json(message);
  
  res.status(200).json(sales);
};

module.exports = {
  addSale,
};