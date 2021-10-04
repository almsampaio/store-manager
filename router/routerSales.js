const express = require('express');

const Controller = require('../controllers');

const router = express.Router();

router.post('/', Controller.sales.additionalSales);

module.exports = {
  router,
};