const Sales = require('../services/SalesServices');

const createNewSales = async (req, res) => {
  const data = req.body;
  const response = await Sales.createNewSales(data);
  console.log(response);
  if (response.err) {
    return res.status(422).json(response);
  }
  res.status(200).json(response);
};

const listSales = async (_req, res) => {
  const salesAll = await Sales.listSales();
  res.status(200).json({ sales: salesAll });
};

const listASalesById = async (req, res) => {
  const { id } = req.params;
  const response = await Sales.listASalesById(id);
  if (response.err) {
    return res.status(404).json(response);
  }
  res.status(200).json(response);
};

module.exports = { createNewSales, listSales, listASalesById };