const { Router } = require('express');

const router = Router();

const ProductsControllers = require('../controllers/ProductsControllers');
const newProductValidate = require('../middlewares/productValidate');

router.post('/', newProductValidate, ProductsControllers.create);
router.get('/', ProductsControllers.getAllProducts);
router.get('/:id', ProductsControllers.findById);
router.put('/:id', newProductValidate, ProductsControllers.updateOne);
router.delete('/:id', ProductsControllers.eliminate);

module.exports = router;
