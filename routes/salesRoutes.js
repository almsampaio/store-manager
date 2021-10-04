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

router.put('/:id', [
  salesQuantityAuth,
  salesController.update,
]);

router.delete('/:id', [
  salesController.remove,
]);

module.exports = router;
