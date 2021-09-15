const {
  createSale,
  getAllSales,
  findSaleById,
  update,
  removeSale,
} = require('../services/Sales');

const create = async (req, res) => {
  const soldItens = req.body;
  const { status, data } = await createSale(soldItens);
  console.log(data);
  return res.status(status).json(data);
};

const getAll = async (_req, res) => {
  const { status, data } = await getAllSales();
  // console.log(data);
  res.status(status).json({ sales: data });
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await findSaleById(id);
  if (message) return res.status(status).json({ err: { code: 'not_found', message } });
  res.status(status).json(data);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { itensSold } = req.body;
  const { status, data } = await update(id, itensSold);
  res.status(status).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await removeSale(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  findById,
  updateSale,
  deleteSale,
};
