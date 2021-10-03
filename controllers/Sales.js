const service = require('../services/Sales');

const OK = 200;

const create = async (req, res, next) => {
  const items = req.body;
  const newSale = await service.create(items);

  if (newSale.error) return next(newSale);

  res.status(OK).json(newSale);
};

const readAll = async (_req, res, _next) =>  {
  const all = await service.readAll();

  res.status(OK).json({ sales: all });
};

const readById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await service.readById(id);

  if (sale.error) return next(sale);

  res.status(OK).json(sale);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const item = req.body;
  const updateSale = await service.update(id, item);

  if (updateSale.error) return next(updateSale);

  res.status(OK).json(updateSale);
};

const destroy =  async (req, res, next) => {
  const { id } = req.params;
  const saleDeleted = await service.destroy(id);

  if (saleDeleted.error) return next(saleDeleted);

  res.status(OK).json(saleDeleted);
};

module.exports = {
  create,
  readAll,
  readById,
  update,
  destroy,
}; 