const Sales = require('../services/Sales');

const getAll = async (_req, res) => {
  const { status, data } = await Sales.getAll();
  res.status(status).json({ sales: data });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Sales.getById(id);

  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  res.status(status).json(data);
};

const create = async (req, res) => {
  const { status, data, message, err } = await Sales.create(req.body);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  if (err) return res.status(status).json({ err: { code: 'stock_problem', message: err } });

  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await Sales.update(id, req.body);
  res.status(status).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Sales.remove(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};