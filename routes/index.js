const routes = require('express').Router();

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_req, res) => {
  res.send();
});

routes.post('/products', productsController.create);
routes.get('/products', productsController.getAll);
routes.get('/products/:id', productsController.get);
routes.put('/products/:id', productsController.update);
routes.delete('/products/:id', productsController.delete);
routes.post('/sales', salesController.create);
routes.get('/sales', salesController.getAll);
routes.get('/sales/:id', salesController.get);
routes.put('/sales/:id', salesController.update);

module.exports = routes;
