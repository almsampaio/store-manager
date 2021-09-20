const express = require('express');
const controller = require('../controller/ctrlSales');

const rotaSales = express.Router();

rotaSales.get('/', controller.getAll);
rotaSales.get('/:id', controller.getById);
rotaSales.post('/', controller.create);
/* rotaSales.put('/sales/:id', controller.editById);
rotaSales.delete('/sales/:id', controller.deleteById); */

module.exports = rotaSales;
