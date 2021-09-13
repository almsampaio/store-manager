const express = require('express');
const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');

const ProductModel = require('../models/ProductModel');
const { existsProductById } = require('../services/productService');
// const { ObjectId } = require('mongodb');
const {
  isValidName,
  isValidQuantity,
  isValidId,
} = require('./validations/productValidation');
const WrongIdFormat = require('../errors/WrongIdFormat');
const ProductNotFound = require('../errors/ProductNotFound');

const route = express.Router();

route.get('/', rescue(async (req, res) => {
  const products = await new ProductModel().getAll();
  
  res.status(StatusCodes.OK).json({ products });
}));

route.get('/:id', isValidId, rescue(async (req, res) => {
  const { id } = req.params;

  const product = await existsProductById(id);

  if (!product) {
    throw new WrongIdFormat();
  }
  
  res.status(StatusCodes.OK).json(product);
}));

route.post('/', isValidName, isValidQuantity, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const { insertedId: _id, insertedCount } = await new ProductModel()
    .insertOne({ name, quantity });

  if (_id && insertedCount === 1) {
    return res.status(StatusCodes.CREATED).json({ _id, name, quantity });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Não foi possível inserir o documento' });
}));

route.put('/:id', isValidId, isValidQuantity, isValidName, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await new ProductModel()
    .findOneAndUpdate(id, { name, quantity });

  const { value } = product;

  if (!value) {
    throw new ProductNotFound();
  }

  return res.status(StatusCodes.OK).json({ _id: id, name, quantity });
}));

route.delete('/:id', isValidId, rescue(async (req, res) => {
  const { id } = req.params;
  
  const product = await new ProductModel()
    .findOneAndDelete(id);

  const { value: productDeleted } = product;

  if (productDeleted) {
    return res.status(StatusCodes.OK).json(productDeleted);
  }

  throw new WrongIdFormat();
}));

route.use(
  /**
   * 
   * @param {AppError} err 
   * @param {request} req 
   * @param {response} res 
   * @param {} next 
   * @returns 
   */
  (err, _req, res, _next) => {
    console.log(err.message);
    return res.status(err.codeStatus).json(err.err);
  },
);

module.exports = (app) => app.use('/products', route);