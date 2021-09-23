const express = require('express');
const salesController = require('../controllers/salesController');

const { salesQuantityAuth } = require('../middlewares');

const router = express.Router();

router.post('/', [
  salesQuantityAuth,
  salesController.add,
]);

module.exports = router;
