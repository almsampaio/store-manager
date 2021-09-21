const express = require('express');
// const validations = require('../middlewares/validations');
const Sales = require('../controllers/Sales');

const router = express.Router();

// router.post('/', validations.validateQuantity);

router.get('/', Sales.getAll);

router.get('/:id', Sales.getById);

module.exports = router;