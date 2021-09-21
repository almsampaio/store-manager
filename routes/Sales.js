const express = require('express');
const validations = require('../middlewares/validations');
const Sales = require('../controllers/Sales');

const router = express.Router();

router.post('/', validations.validateSalesQuantity, Sales.create);

router.get('/', Sales.getAll);

router.get('/:id', Sales.getById);

router.put('/:id', validations.validateSalesQuantity, Sales.update);

router.delete('/:id', Sales.remove);

module.exports = router;