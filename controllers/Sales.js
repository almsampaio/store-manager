const salesService = require('../services/Sales');

const create = async (req, res) => {
  const itensSold = req.body;

  const sales = await salesService.create(itensSold);

  if (!sales.err) {
    res.status(200).json(sales);
  }

  return res.status(422).json({ err: sales.err });
};

module.exports = {
  create,
};
