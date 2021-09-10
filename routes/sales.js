const express = require('express');
const rescue = require('express-rescue');

const CreateSalesController = require('../controller/sales/CreateSalesController');
const DeleteSaleController = require('../controller/sales/DeleteSaleController');
const GetAllSalesController = require('../controller/sales/GetAllSalesController');
const GetSaleController = require('../controller/sales/GetSaleController');
const UpdateSaleController = require('../controller/sales/UpdateSaleController');

const errorMiddleware = require('../middlewares/errorMiddleware');
const authSales = require('../middlewares/sales/authSales');

const router = express.Router();

const createSalesController = new CreateSalesController();
const getAllSalesController = new GetAllSalesController();
const getSaleController = new GetSaleController();
const updateSaleController = new UpdateSaleController();
const deleteSaleController = new DeleteSaleController();

router.post('/', rescue(authSales), rescue(createSalesController.handle));

router.get('/', getAllSalesController.handle);

router.put('/:id', rescue(authSales), updateSaleController.handle);

router.get('/:id', rescue(getSaleController.handle));

router.delete('/:id', rescue(deleteSaleController.handle));

router.use(errorMiddleware);

module.exports = router;
