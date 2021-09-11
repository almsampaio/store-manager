const { Router } = require('express');

const router = Router();

const salesController = require('../controllers/salesController');

router.post('/', salesController.addSales);

router.get('/', salesController.getAll);

module.exports = router;
