const productService = require('../services/productService');

const getAllProducts = ('/', (_req, res) => {
  const frase = 'Hello World';

  return res.status(200).end(frase);
});

const createProducts = ('/', async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productService.createProducts(name, quantity);

  if (response.code) {
    return res.status(422).json({
      err: {
        code: response.code,
        message: response.message,
      },
    });
}

  return res.status(201).json({ _id: response.id, name, quantity });
});

module.exports = {
  getAllProducts,
  createProducts,
};
