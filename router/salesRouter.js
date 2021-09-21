const express = require('express');
const Sales = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.post('/', validateSale, Sales.create);

module.exports = router;