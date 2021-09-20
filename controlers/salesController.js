const salesServices = require('../services/salesServices');

const addSales = async (req, res) => {
  const sales = req.body;
  const { status, result } = await salesServices.addSales(sales);
  res.status(status).json(result);
};

module.exports = {
  addSales,
};