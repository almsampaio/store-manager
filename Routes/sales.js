const express = require('express');
const salesController = require('../controllers/sales');
const { validateNewSale } = require('../middlewares/sales');

const router = express.Router();

router.post('/', validateNewSale, salesController.addNew);

module.exports = router;
