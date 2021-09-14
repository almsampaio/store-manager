const rescue = require('express-rescue');
const productsService = require('../services/products');

const createProduct = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const createdProduct = await productsService.createProduct(name, quantity);

  if (createdProduct.message) {
    const error = {
      err: {
        message: createdProduct.message,
        code: 'invalid_data',
      },
    };

    return res.status(422).json(error); 
  }

  return res.status(201).json(createdProduct);
});

const getProductById = rescue(async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getProductById(id);

  if (product.message) {
    const error = {
      err: {
        message: product.message,
        code: 'invalid_data',
      },
    };

    return res.status(422).json(error);
  }

  return res.status(200).json(product);
});

const getProducts = rescue(async (_req, res) => {
  const products = await productsService.getProducts();

  return res.status(200).json(products);
});

const updateProduct = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await productsService.updateProduct(id, name, quantity);

  if (updatedProduct.message) {
    const error = {
      err: {
        message: updatedProduct.message,
        code: 'invalid_data',
      },
    };

    return res.status(422).json(error);
  }

  return res.status(200).json(updatedProduct);
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productsService.deleteById(id);

  if (deletedProduct.message) {
    const error = {
      err: {
        code: 'invalid_data',
        message: deletedProduct.message,
      },
    };

    return res.status(422).json(error);
  }

  return res.status(200).json({ deletedProduct });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteById,
};
