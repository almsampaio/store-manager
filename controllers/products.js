const productService = require('../services/products');

const addNew = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await productService.addNew({ name, quantity });
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNew,
};
