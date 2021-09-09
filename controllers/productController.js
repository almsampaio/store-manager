const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const app = express();
const {
  HTTP_CREATED_STATUS,
  HTTP_NO_BODY_STATUS,
} = require('../helpers/helpers');

app.use(bodyParser.json());
const service = require('../services/productService');

const createController = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const productsCreated = await service.create(name, quantity);
  if (productsCreated.err) {
    return res.status(HTTP_NO_BODY_STATUS)
    .json(productsCreated);
  }

  return res.status(HTTP_CREATED_STATUS).json(productsCreated);
});

module.exports = {
  createController,
};
