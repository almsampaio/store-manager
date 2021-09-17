const { Router } = require('express');

const router = Router();
const productsControllers = require('../controllers/productsControllers');
const productsValidations = require('../midllewares/productsValidations');

router.get('/products', productsControllers.getProducts);

router.get('/products/:id', productsControllers.getProductsById);

router.post('/products', productsValidations.validate, productsControllers.createdNewProduct);

router.put('/products/:id', productsValidations.validate, productsControllers.update);

module.exports = router;
