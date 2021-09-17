const express = require('express');

const router = express.Router();
const { validateQuantities } = require('../middlewares/midValidationsSales');
const { registerSale } = require('../controllers/salesControllers');

router.post('/', validateQuantities, registerSale);

module.exports = router;
