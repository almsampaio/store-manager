const express = require('express');
const rescue = require('express-rescue');

const RegisterProductController = require('../controller/products/RegisterProductController');
const GetAllProdutsController = require('../controller/products/GetAllProductsController');
const UpdateProductController = require('../controller/products/UpdateProductController');
const GetProductByIdController = require('../controller/products/GetProductByIdController');
const DeleteProductController = require('../controller/products/DeleteProductController');

const authProduct = require('../middlewares/products/authProduct');
const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();

router.post('/', authProduct, rescue(RegisterProductController.handle));

router.get('/', GetAllProdutsController.handle);

router.put('/:id', authProduct, UpdateProductController.handle);

router.get('/:id', rescue(GetProductByIdController.handle));

router.delete('/:id', rescue(DeleteProductController.handle));

router.use(errorMiddleware);

module.exports = router;
