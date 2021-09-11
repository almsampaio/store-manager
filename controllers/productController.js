const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

// Requisito 1

exports.postNewProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await productService.createNewProduct({ name, quantity });
    if (result) {
      return res.status(StatusCodes.CREATED).json(result);
    }
    return res.status(422).json({ message: 'Product already exists' });
  } catch (e) {
    next(e);
  }
};