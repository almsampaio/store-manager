const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const rescue = require('express-rescue');

const {
  HTTP_OK_STATUS,
  // HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
  // HTTP_401,
  HTTP_NOT_FOUND_STATUS,
} = require('../helpers/statusCode');

const salesServices = require('../services/salesServices');

const addSales = rescue(async (req, res) => {
  const itensSold = req.body;
  // console.log(itensSold);

  const salesList = await salesServices.createdSales(itensSold);
  // console.log(salesList);

  if (salesList.err) {
    return res.status(HTTP_NO_BODY_STATUS).json(salesList);
  }

  return res.status(HTTP_OK_STATUS).json(salesList);
});

const getAllSales = rescue(async (_req, res) => {
  const allSales = await salesServices.getAllSales();
  return res.status(HTTP_OK_STATUS).json({ sales: allSales });
});

const getSalesById = rescue(async (req, res) => {
  const { id } = req.params;
  const salesById = await salesServices.getSalesById(id);

  if (salesById.err) {
    return res.status(HTTP_NOT_FOUND_STATUS).json(salesById);
  }

  return res.status(HTTP_OK_STATUS).json(salesById);
});

module.exports = {
  addSales,
  getAllSales,
  getSalesById,
};
