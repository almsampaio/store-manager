const express = require('express');

const router = express.Router();

const ProductsController = require('../controllers/Products');

router.post('/', ProductsController.create);
router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.getById);
router.put('/:id', ProductsController.setById);

module.exports = router;
