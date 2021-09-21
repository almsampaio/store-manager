const express = require('express');
const Sales = require('../controllers/salesController');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/:id', Sales.getById);
router.put('/:id', validateSale, Sales.update);
router.post('/', validateSale, Sales.create);
router.get('/', Sales.getAll);

module.exports = router;