const express = require('express');
const rescue = require('express-rescue');
const error = require('../middlewares/error');

const route = express.Router();
const Sales = require('../controllers/sales');

route.post('/', Sales.insertOne);
module.exports = route;
