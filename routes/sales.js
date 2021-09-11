const express = require('express');
const rescue = require('express-rescue');

const CreateSalesController = require('../controller/sales/CreateSalesController');
const GetAllSalesController = require('../controller/sales/GetAllSalesController');
const UpdateSaleController = require('../controller/sales/UpdateSaleController');
const GetSaleController = require('../controller/sales/GetSaleController');
const DeleteSaleController = require('../controller/sales/DeleteSaleController');

const errorMiddleware = require('../middlewares/errorMiddleware');
const authSales = require('../middlewares/sales/authSales');

const router = express.Router();

router.post('/', rescue(authSales), rescue(CreateSalesController.handle));

router.get('/', GetAllSalesController.handle);

router.put('/:id', rescue(authSales), UpdateSaleController.handle);

router.get('/:id', rescue(GetSaleController.handle));

router.delete('/:id', rescue(DeleteSaleController.handle));

router.use(errorMiddleware);

module.exports = router;
