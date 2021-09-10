const express = require('express');
const { StatusCodes } = require('http-status-codes');
const ProductModel = require('../models/productModel');
const { existsProductById } = require('../services/productService');
// const { ObjectId } = require('mongodb');
const {
  isValidName,
  isValidQuantity,
  isValidId
} = require('./validations/productValidation');
const AppError = require('./validations/error');
const rescue = require('express-rescue');
const { errorsMessages } = require('./validations/productValidation');

// const i = '61355dc0e7dfcbf9efe858fd';
// console.log(typeof ObjectId(i));
const route = express.Router();

route.get('/', rescue(async (req, res) => {

  const products = await ProductModel.dao().getAll();
  
  res.status(StatusCodes.OK).json({ products });
}));

route.get('/:id', isValidId, rescue(async (req, res) => {
  const { id } = req.params;

  const product = await existsProductById(id);

  if (!product) {
    throw new AppError('Validation: Wrong Id format',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.wrongIdFormat,
      }});
  }
  
  res.status(StatusCodes.OK).json(product);
}));

route.post('/', isValidName, isValidQuantity, rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const { insertedId: _id, insertedCount } = await new ProductModel()
    .insertOne({ name, quantity });

  if (_id && insertedCount === 1) {
    return res.status(StatusCodes.CREATED).json({ _id, name, quantity});
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Não foi possível inserir o documento'});
}));

route.put('/:id', isValidId, isValidQuantity, isValidName, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const product = await new ProductModel()
    .updateOne(id, { name, quantity });

  const { modifiedCount, matchedCount } = product;

  if (matchedCount < 1) {
    throw new AppError('Validation: Product don\'t found',
      { err: {
        code: errorsMessages.code,
        message: errorsMessages.productDontFound,
      }});
  }

  if (modifiedCount === 1) {
    return res.status(StatusCodes.OK).json({ _id: id, name, quantity });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: 'Não foi possível fazer update no documento'});
}));

route.delete('/:id', isValidId, rescue(async (req, res) => {
  const { id } = req.params;
  
  const product = await new ProductModel()
    .findOneAndDelete(id);

  // findOneAndDelete retorna value: null se não encontra nada.
  // Caso encontre value é igual ao documento encontrado. 
  const { value } = product;

  if (value) {
    const { _id, name, quantity } = value;
    return res.status(StatusCodes.OK).json({ _id, name, quantity });
  }

  throw new AppError('Validation: Wrong Id format',
    { err: {
      code: errorsMessages.code,
      message: errorsMessages.wrongIdFormat,
    }});
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
  }
);

module.exports = (app) => app.use('/products', route);