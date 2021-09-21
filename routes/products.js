const express = require('express');
const productValidator = require('../middlewares/Products');
const productController = require('../controllers/Products');

const router = express.Router();

router.post('/', productValidator.add, productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router;
