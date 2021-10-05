const express = require('express');
const controller = require('../controller/salesController');

const routes = express.Router();

routes.post('/', controller.addNewSale);