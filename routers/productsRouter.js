const { Router } = require('express');

const router = Router();

const productsController = require('../controllers/productsController');

router.post('/', productsController.addProduct);

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

module.exports = router;
