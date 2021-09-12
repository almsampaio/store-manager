const express = require('express');
const salesController = require('../controllers/salesController');
const { SalesValidate } = require('../middleware/salesValidation');

const router = express.Router();

router.post('/', SalesValidate, salesController.create);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

module.exports = router;
