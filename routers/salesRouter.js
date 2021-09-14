const express = require('express');
const salesController = require('../controllers/salesController');
const {
  SalesValidate,
  idValidate,
  salesAlreadyExists,
  validateId,
} = require('../middleware/salesValidation');

const router = express.Router();

router.post('/', SalesValidate, salesController.create);

router.get('/', salesController.getAll);

router.get('/:id', idValidate, salesAlreadyExists, salesController.getById);

router.put('/:id', SalesValidate, salesController.update);

router.delete('/:id', validateId, salesController.deleteById);

module.exports = router;
