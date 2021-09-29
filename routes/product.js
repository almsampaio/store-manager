const { Router } = require('express');
const { create } = require('../controllers/product');
const validation = require('../middlewares/productValidation');

const productRouter = Router();

productRouter.post('/', validation, create);

module.exports = productRouter;
