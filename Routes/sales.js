const express = require('express');
const salesController = require('../controllers/sales');
const { validateNewSale } = require('../middlewares/sales');

const router = express.Router();

router.post('/', validateNewSale, salesController.addNew);

router.get('/', salesController.get);

router.get('/:id', salesController.get);

module.exports = router;
