const { Router } = require('express');
const { create, list, remove, update } = require('../controllers/sale');
const validation = require('../middlewares/saleValidation');

const salesRouter = Router();

salesRouter.post('/', validation, create);
salesRouter.get('/:id', list);
salesRouter.put('/:id', validation, update);
salesRouter.delete('/:id', remove);

salesRouter.get('/', list);

module.exports = salesRouter;
