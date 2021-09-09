const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const { insertOne } = require('../controllers/products');

router.post('/', rescue(insertOne));