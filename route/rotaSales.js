const express = require('express');
const controller = require('../controller/ctrlSales');

const rotaSales = express.Router();

rotaSales.post('/', controller.createAllSales);

module.exports = rotaSales;
