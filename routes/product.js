const { Router } = require('express');
const { create, list, update, remove } = require('../controllers/product');
const validation = require('../middlewares/productValidation');

const productRouter = Router();

productRouter.post('/', validation, create);
productRouter.get('/:id', list);
productRouter.put('/:id', validation, update);
productRouter.delete('/:id', remove);

productRouter.get('/', list);

module.exports = productRouter;
