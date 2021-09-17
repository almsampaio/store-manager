const { Router } = require('express');

const router = Router();
const productsControllers = require('../controllers/productsControllers');
const productsValidations = require('../midllewares/productsValidations');

router.post('/products', productsValidations.validate,
productsControllers.createdNewProduct);

module.exports = router;
