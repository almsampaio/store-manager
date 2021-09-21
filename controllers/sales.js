const sales = require('../services/sales');

const getAll = async (_req, res) => {
  const { status, data } = await sales.getAll();
  res.status(status).json({ sales: data });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await sales.getById(id);
  if (!sale) return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  res.status(200).json(sale);
};

const create = async (req, res) => {
  const { status, data, message, err } = await sales.create(req.body);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  if (err) return res.status(status).json({ err: { code: 'stock_problem', message: err } });
  res.status(status).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await sales.update(id, req.body);
  res.status(status).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const product = await sales.getById(id);
  if (!product) {
 return res.status(422)
  .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } }); 
}

  await sales.deleteSale(id);

  res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};