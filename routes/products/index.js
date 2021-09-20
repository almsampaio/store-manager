const router = require('express').Router();
const productsController = require('../../controllers/productsController');

// GET
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

// POST
router.post('/', productsController.create);

module.exports = router;
