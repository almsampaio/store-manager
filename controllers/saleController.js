const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const app = express();
const {
  HTTP_OK_STATUS,
  HTTP_NO_BODY_STATUS,
} = require('../helpers/helpers');

app.use(bodyParser.json());
const service = require('../services/saleService');

const createController = rescue(async (req, res) => {
  const itensSold = req.body;
  // console.log(req.body);
  const saleCreated = await service.create(itensSold);
  if (saleCreated.err) {
    return res.status(HTTP_NO_BODY_STATUS)
    .json(saleCreated);
  }

  return res.status(HTTP_OK_STATUS).json(saleCreated);
});

module.exports = {
  createController,
};
