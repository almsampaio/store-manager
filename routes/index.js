const { Router } = require('express');
const productRouter = require('./product');
const salesRouter = require('./sales');

const routes = Router();

routes.use('/products', productRouter);
routes.use('/sales', salesRouter);

module.exports = routes;
