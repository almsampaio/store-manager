const express = require('express');
const productValidator = require('../middlewares/Products');
const { validateId } = require('../middlewares/ProductsIds');
const productController = require('../controllers/Products');

const router = express.Router();

router.post('/', productValidator.add, productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/:id', validateId, productValidator.add, productController.update);
router.delete('/:id', validateId, productController.remove);

module.exports = router;
