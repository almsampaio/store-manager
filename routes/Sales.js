const express = require('express');

const Router = express.Router();

const Sales = require('../controllers/Sales');

const SalesMiddleware = require('../middlewares/saleMiddleware');

Router.route('/')
  .get(Sales.getAll)
  .post(
  SalesMiddleware.saleValidate,
  Sales.create,
);

Router.route('/:id')
  .get(
    SalesMiddleware.saleIdValidate,
    Sales.getById,
  )
  .put(
    SalesMiddleware.saleIdValidate,
    SalesMiddleware.saleValidate,
    Sales.update,
  );

module.exports = Router;
