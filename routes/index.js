const routes = require('../util/express-rest').Router();
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

// não remova esse endpoint, e para o avaliador funcionar
routes.get('/', (_req, res) => {
  res.send();
});
routes.rest('/products', productsController);
routes.rest('/sales', salesController);

module.exports = routes;
