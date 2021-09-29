const { Router } = require('express');
const { create } = require('../controllers/sale');
const validation = require('../middlewares/saleValidation');

const salesRouter = Router();

salesRouter.post('/', validation, create);
salesRouter.get('/:id');
salesRouter.put('/:id');
salesRouter.delete('/:id');

salesRouter.get('/');

module.exports = salesRouter;
