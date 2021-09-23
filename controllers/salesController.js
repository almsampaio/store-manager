const salesService = require('../services/salesService');

const add = async (req, res) => {
  const itensSold = req.body;
  const success = 200;

  const insertedSale = await salesService.add(itensSold);

  res.status(success).json(insertedSale);
};

module.exports = {
  add,
};
