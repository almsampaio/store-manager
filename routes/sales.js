const express = require('express');
const bodyParser = require('body-parser');

const Sales = require('../controllers/Sales');

const { quantityValidation } = require('../middlewares/salesValidations');

const router = express.Router();

router.use(bodyParser.json());

router.post('/', quantityValidation, Sales.createSales);

module.exports = router;
