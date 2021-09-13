const express = require('express');

const router = express.Router();

const addNewProduct = require('../controllers/addNewProduct');

router.post('/', addNewProduct);

module.exports = router;
