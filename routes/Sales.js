const express = require('express');

const salesController = require('../controllers/Sales');

const routes = express.Router();

routes.post('/', salesController.create);

module.exports = routes;
