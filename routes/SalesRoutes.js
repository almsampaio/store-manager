const express = require('express');

const router = express.Router();

const {
  addSale,
} = require('../controllers');

router.post('/', addSale);

module.exports = router;
