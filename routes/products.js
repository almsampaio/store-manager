const express = require('express');
const rescue = require('express-rescue');
const { isValidPayload } = require('../middlewares/products');

const router = express.Router();

const { insertOne } = require('../controllers/products');

router.post('/', isValidPayload, rescue(insertOne));

module.exports = router;