const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
// const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_NO_BODY_STATUS = 422;

const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const { product } = await productService.getAll();

  return res.status(HTTP_OK_STATUS).json(product);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, message, product } = await productService.getById(id);
  if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
  res.status(HTTP_OK_STATUS).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  console.log('name, quantity ----- productController', name, quantity);
  const { code, message, product } = await productService.create(name, quantity);
  // const RESPOSTA = await productService.create(name, quantity);

  // console.log('RESPOSTA ---- productController', RESPOSTA);
  if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });

  res.status(HTTP_CREATED_STATUS).json(product);
};

const actualize = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { code, message, product } = await productService.actualize(name, quantity, id);
  if (code && message) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
  res.status(HTTP_OK_STATUS).json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { code, message, product } = await productService.getById(id);
  if (!product) return res.status(HTTP_NO_BODY_STATUS).json({ code, message });
  await productService.remove(id);
  res.status(HTTP_OK_STATUS).end();
};

module.exports = {
  create,
  getAll,
  getById,
  actualize,
  remove,
};