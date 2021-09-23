const salesService = require('../services/salesService');

const add = async (req, res) => {
  const itensSold = req.body;
  const success = 200;

  const insertedSale = await salesService.add(itensSold);

  res.status(success).json(insertedSale);
};

const getAll = async (_req, res) => {
  const success = 200;

  const sales = await salesService.getAll();

  res.status(success).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.body;
  const success = 200;
  const message = 'Sale not found';
  const code = 'not_found';
  const errType = 404;

  const sale = await salesService.getById(id);

  if (!sale) {
    return next({
    err: {
      message,
      code,
      data: { errType },
    },
  });
}
  return res.status(success).json(sale);
};

module.exports = {
  add,
  getAll,
  getById,
};
