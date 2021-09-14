const { Router } = require('express');
const salesController = require('../controller/SalesController');

const salesRoutes = Router();

salesRoutes.post('/sales', salesController.createSaleController);
salesRoutes.get('/sales', salesController.getAllSalesController);
salesRoutes.get('/sales/:id', salesController.getSaleByIdController);
salesRoutes.delete('/sales/:id', salesController.deleteSaleController);
// salesRoutes.put('/sales/:id', salesController.updateSaleController);

module.exports = salesRoutes;