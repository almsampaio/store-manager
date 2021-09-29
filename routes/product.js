const { Router } = require('express');
const { create, list, update } = require('../controllers/product');
const validation = require('../middlewares/productValidation');

const productRouter = Router();

productRouter.post('/', validation, create);
productRouter.get('/:id', list);
productRouter.put('/:id', validation, update);

productRouter.get('/', list);

module.exports = productRouter;
