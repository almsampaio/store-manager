const express = require('express');

const productController = require('../controllers/Products');

const routes = express.Router();

routes.post('/', productController.create);

module.exports = routes;
