const { Router } = require('express');

const router = Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.getAll);

module.exports = router;
