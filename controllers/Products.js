const productService = require('../services/Products');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.create(name, quantity);

  if (!newProduct) {
 return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  }); 
}

  return res.status(201).json(newProduct);
};

module.exports = {
  create,
};