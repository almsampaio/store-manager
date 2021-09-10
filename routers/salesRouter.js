const { Router } = require('express');

const router = Router();

const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);

module.exports = router;
