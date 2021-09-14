const express = require('express');
const rescue = require('express-rescue');
const error = require('../middlewares/error');
const { isValidPayload } = require('../middlewares/sales');

const route = express.Router();
const Sales = require('../controllers/sales');

route.post('/', isValidPayload, rescue(Sales.insertSales));
route.use(error);
module.exports = route;
