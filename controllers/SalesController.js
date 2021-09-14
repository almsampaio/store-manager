const SalesService = require('../services/SalesService');

const create = async (req, res) => {
  const itensSold = req.body;

  const { status, code, message, sales } = await SalesService.create(itensSold);
  if (!sales) return res.status(status).json({ err: { code, message } });
  res.status(status).json(sales);
};

const getAll = async (_req, res) => {
  const { status, sales } = await SalesService.getAll();
  res.status(status).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, code, message, sales } = await SalesService.getById(id);
  if (!sales) return res.status(status).json({ err: { code, message } });
  res.status(status).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const { status, code, message, sales } = await SalesService.update(id, itensSold);
  if (!sales) return res.status(status).json({ err: { code, message } });
  res.status(status).json(sales);
};

// const exclude = async (req, res) => {
//   const { id } = req.params;
//   const { status, code, message, product } = await ProductsService.exclude(id);
//   if (!product) return res.status(status).json({ err: { code, message } });
//   res.status(status).json(product);
// };

module.exports = {
 create,
 getAll,
 getById,
 update,
//  exclude,
};