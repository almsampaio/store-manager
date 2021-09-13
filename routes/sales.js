const express = require('express');

const salesRouter = express.Router();
const salesControllers = require('../controllers/salesControllers');
const { createSaleValidation } = require('../middlewares/sales');
const salesErrorMiddleware = require('../middlewares/salesErrors');

salesRouter.post('/', createSaleValidation, salesControllers.createSale);
salesRouter.get('/', salesControllers.getAllSales);
salesRouter.get('/:id', salesControllers.getSaleById);

salesRouter.use(salesErrorMiddleware);
module.exports = salesRouter;
