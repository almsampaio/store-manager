const productsService = require('../services/products');

const createProduct = async (req, res) => {
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
};

const getProducts = async (req, res) => {
  const products = await productsService.getProducts();

  return res.status(200).json(products);
};

module.exports = {
  createProduct,
  getProducts,
};
