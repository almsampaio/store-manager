const express = require('express');
const rescue = require('express-rescue');
const error = require('../middlewares/error');
const { isValidPayload, isValidSaleId } = require('../middlewares/sales');

const route = express.Router();
const Sales = require('../controllers/sales');

route.post('/', isValidPayload, rescue(Sales.insertSales));
route.get('/:id', isValidSaleId, rescue(Sales.getSaleById));
route.get('/', rescue(Sales.getSales));
route.put('/:id', isValidSaleId, isValidPayload, rescue(Sales.updateSale));
route.use(error);
module.exports = route;
