const { Router } = require('express');
const productRouter = require('./product');

const routes = Router();

routes.use('/products', productRouter);

module.exports = routes;
