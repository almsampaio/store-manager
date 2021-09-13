const Sales = require('../services/Sales');

const createSales = async (req, res) => {
  const soldItems = req.body;
  const { status, data } = await Sales.createSales(soldItems);
  res.status(status).json(data);
};

module.exports = {
  createSales,
};
