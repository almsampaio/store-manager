const express = require('express');
const rescue = require('express-rescue');
const { isValidPayload, existId } = require('../middlewares/products');
const error = require('../middlewares/error');

const route = express.Router();

const Products = require('../controllers/products');

route.post('/', isValidPayload, rescue(Products.insertOne));
route.get('/:id', existId, rescue(Products.getProductById));
route.get('/', rescue(Products.getProducts));
route.use(error);
module.exports = route;