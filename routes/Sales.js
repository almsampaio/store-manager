const express = require('express');

const Router = express.Router();

const Sales = require('../controllers/Sales');

const SalesMiddleware = require('../middlewares/saleMiddleware');

Router.route('/')
  .get(Sales.getAll)
  .post(
  SalesMiddleware.addSaleValidate,
  Sales.create,
);

Router.route('/:id')
  .get(
    SalesMiddleware.getSaleByIdValidate,
    Sales.getById,
  );

module.exports = Router;
