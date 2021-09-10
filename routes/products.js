const express = require('express');
const rescue = require('express-rescue');

const RegisterProductController =
  require('../controller/products/RegisterProductController');
const GetAllProdutsController =
  require('../controller/products/GetAllProductsController');
const GetProductByIdController =
  require('../controller/products/GetProductByIdController');
const UpdateProductController =
  require('../controller/products/UpdateProductController');
const DeleteProductController =
  require('../controller/products/DeleteProductController');

const authProduct = require('../middlewares/products/authProduct');
const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();

const registerProductController = new RegisterProductController();
const getAllProductsController = new GetAllProdutsController();
const getProductByIdController = new GetProductByIdController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

router.post('/', authProduct, rescue(registerProductController.handle));

router.get('/', getAllProductsController.handle);

router.put('/:id', authProduct, updateProductController.handle);

router.get('/:id', rescue(getProductByIdController.handle));

router.delete('/:id', rescue(deleteProductController.handle));

router.use(errorMiddleware);

module.exports = router;
