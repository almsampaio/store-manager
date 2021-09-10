const express = require('express');
const rescue = require('express-rescue');
const isValidPayload = require('../middlewares/products');
const error = require('../middlewares/error');

const router = express.Router();

const { insertOne } = require('../controllers/products');

router.post('/', isValidPayload, rescue(insertOne));

router.use(error);
module.exports = router;