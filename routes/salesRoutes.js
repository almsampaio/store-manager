const express = require('express');
const salesController = require('../controllers/salesController');

const { salesQuantityAuth } = require('../middlewares');

const router = express.Router();

router.post('/', [
  salesQuantityAuth,
  salesController.add,
]);

router.get('/', [
  salesController.getAll,
]);

router.get('/:id', [
  salesController.getById,
]);

module.exports = router;
