const express = require('express');
const bodyParser = require('body-parser');

const Sales = require('../controllers/Sales');

const { quantityValidation } = require('../middlewares/salesValidations');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', Sales.getSales);
router.get('/:id', Sales.getSaleById);
router.post('/', quantityValidation, Sales.createSales);
router.put('/:id', quantityValidation, Sales.editSale);

module.exports = router;
