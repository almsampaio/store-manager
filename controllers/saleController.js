const express = require('express');
const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');

const SalesModel = require('../models/SalesModel');
const {
  isValidId,
  saleIdNotFound,
  saleSubtractProductsQuantity,
  allqtyGTEOne,
  allIdsExists,
} = require('./validations/saleValidations');
const { existsSaleById, addProductsQuantity } = require('../services/saleService');
const SaleNotFound = require('../errors/SaleNotFound');
const WrongSaleIdFormat = require('../errors/WrongSaleIdFormat');

const route = express.Router();

route.get('/', rescue(async (req, res) => {
  const sales = await new SalesModel().getAll();
  
  res.status(StatusCodes.OK).json({ sales });
}));

route.get('/:id', isValidId, rescue(async (req, res) => {
  const { id } = req.params;

  const sales = await existsSaleById(id);

  if (!sales) {
    throw new SaleNotFound();
  }
  
  res.status(StatusCodes.OK).json(sales);
}));

route.post('/',
  allqtyGTEOne,
  allIdsExists,
  saleSubtractProductsQuantity,
  rescue(async (req, res) => {
    const itensSold = req.body;

    const { insertedId: _id, insertedCount } = await new SalesModel()
      .insertOne({ itensSold });

    if (_id && insertedCount === 1) {
      return res.status(StatusCodes.OK).json({ _id, itensSold });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Não foi possível inserir o documento' });
}));

route.put('/:id',
  allqtyGTEOne,
  allIdsExists,
  saleSubtractProductsQuantity,
  rescue(async (req, res) => {
    const { id } = req.params;
    const itensSold = req.body;
    
    const product = await new SalesModel()
      .updateOne(id, itensSold);

    const { modifiedCount, matchedCount } = product;

    if (matchedCount < 1) {
      throw new SaleNotFound();
    }

    if (modifiedCount === 1) {
      return res.status(StatusCodes.OK).json({ _id: id, itensSold });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Não foi possível fazer update no documento' });
}));

route.delete('/:id', saleIdNotFound, rescue(async (req, res) => {
  const { id } = req.params;
  
  const sale = await new SalesModel()
    .findOneAndDelete(id);

  const { value } = sale;

  if (value) {
    const { _id, itensSold } = value;
    addProductsQuantity(itensSold);
    return res.status(StatusCodes.OK).json({ _id, itensSold });
  }

  throw new WrongSaleIdFormat();
}));

route.use((err, _req, res, _next) => {
  console.log(err.message);
  return res.status(err.codeStatus).json(err.err);
});

module.exports = (app) => app.use('/sales', route);