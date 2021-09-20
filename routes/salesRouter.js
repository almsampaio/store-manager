const express = require('express');

const router = express.Router();

const salesController = require('../controllers/Sales');

router.post('/', salesController.create);

module.exports = router;
