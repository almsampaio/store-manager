const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');
const validations = require('../middlewares/validations');

router.post('/',
  validations.validateSoldProductQuantity,
  salesController.create);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.put('/:id',
  validations.validateSoldProductQuantity,
  salesController.update);

router.delete('/:id', validations.validateSaleExists,
  salesController.exclude);

module.exports = router;