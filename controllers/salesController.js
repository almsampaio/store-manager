const salesService = require('../services/salesService');

const create = async (req, res) => {
  const sales = req.body;
  const sale = await salesService.create(sales);
  console.log('sale', sale);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  return res.status(200).json(sale);
};

module.exports = {
  create,
};
