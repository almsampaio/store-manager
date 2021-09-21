const Sales = require('../services/SalesServices');

const createNewSales = async (req, res) => {
  const data = req.body;
  const response = await Sales.createNewSales(data);
  if (response.err) {
    return res.status(422).json(response);
  }
  res.status(200).json(response);
};

const listSales = async (_req, res) => {
  const response = await Sales.listSales();
  res.status(200).json({ sales: response });
};

const listASalesById = async (req, res) => {
  const { id } = req.params;
  const response = await Sales.listASalesById(id);
  if (response.err) {
    return res.status(404).json(response);
  }
  res.status(200).json(response);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await Sales.updateSales(id, data);
  if (response === null) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  res.status(200).json(response.value);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const exclude = await Sales.deleteSale(id);
  if (exclude.status) return res.status(exclude.status).json({ err: exclude.err });
  return res.status(200).json(exclude);
};

module.exports = {
  createNewSales,
  listSales,
  listASalesById,
  updateSales,
  deleteSales,
};