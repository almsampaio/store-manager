const salesService = require('../services/salesService');

const add = async (req, res, next) => {
  const itensSold = req.body;
  const success = 200;
  const message = 'Such amount is not permitted to sell';
  const code = 'stock_problem';
  const errType = 404;

  const insertedSale = await salesService.add(itensSold);
  
  if (!insertedSale) return next({
    err: {
      message,
      code,
      data: { errType }
    }
  });

  return res.status(success).json(insertedSale);
};

const getAll = async (_req, res) => {
  const success = 200;

  const sales = await salesService.getAll();

  return res.status(success).json(sales);
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

const update = async (req, res) => {
  const { productId, quantity } = req.body[0];
  const success = 200;

  const updatedSale = await salesService.update(productId, quantity);

  return res.status(success).json(updatedSale);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const success = 200;
  const message = 'Wrong sale ID format';
  const code = 'invalid_data';
  const errType = 422;

  const removedSale = await salesService.remove(id);

  if (!removedSale) {
    return next({
    err: {
      message,
      code,
      data: { errType },
    },
  });
}
  return res.status(success).json(removedSale);
  };

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
