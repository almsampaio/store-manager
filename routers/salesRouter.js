const express = require('express');
const salesController = require('../controllers/salesController');
const { SalesValidate, idValidate } = require('../middleware/salesValidation');

const router = express.Router();

router.post('/', SalesValidate, salesController.create);

router.get('/', salesController.getAll);

router.get('/:id', idValidate, salesController.getById);

router.put('/:id', SalesValidate, salesController.update);

module.exports = router;
