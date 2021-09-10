const productService = require('../services/products');

const addNew = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const { _id } = await productService.addNew({ name, quantity });
    return res.status(201).json({ _id, name, quantity });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNew,
};
