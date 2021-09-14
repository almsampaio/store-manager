const services = require('../services/salesServices');
const model = require('../models/salesModel');

const getAll = async (_req, res) => {
  const allSales = await model.getAll();
  return res.status(200).json({ sales: allSales });
};

const getById = async (req, res) => {
  const { id } = req.params;

  const sale = await model.getById(id);

  if (!sale) {
    return res.status(404).json({ err: 
      { message: 'Sale not found', code: 'invalid_data' },
    });
  }

  return res.status(200).json(sale);
};

const add = async (req, res) => {
  const addSales = await services.add(req.body);

  if (addSales.err) return res.status(422).json(addSales);
  
  return res.status(201).json(addSales);
};

const update = async (req, res) => {
  const { id } = req.params;

  const updateSale = await model.update(id, req.body);
  return res.status(200).json(updateSale);
};

module.exports = { getAll, getById, add, update };