const { Router } = require('express');
const { create, list } = require('../controllers/product');
const validation = require('../middlewares/productValidation');

const productRouter = Router();

productRouter.post('/', validation, create);
productRouter.get('/:id', list);
productRouter.get('/', list);

module.exports = productRouter;
