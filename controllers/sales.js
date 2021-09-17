const express = require('express');
const rescue = require('express-rescue');
const bodyparser = require('body-parser');
const service = require('../services/sales');

const app = express();
app.use(bodyparser.json());

const createSales = rescue(async (req, res) => {
  const itensSold = req.body;
  const createdSales = await service.createSales(itensSold);
   if (createdSales.err) {
    return res.status(422).json(createdSales);
  }
  return res.status(200).json(createdSales);
});

 const getAllSales = rescue(async (req, res) => {
  const salesAll = await service.getAllSales();

  res.status(200).json(salesAll);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await service.getById(id);
  console.log(sale);
  if (sale.err) {
    return res.status(404).json(sale);
  }
  return res.status(200).json(sale);
});

module.exports = {
  createSales,
  getAllSales,
  getById,
};
