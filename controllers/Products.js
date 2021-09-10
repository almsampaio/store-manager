const productsService = require('../services/Products');

module.exports = {
  async create(req, res) {
    const { name, quantity } = req.body;

    try {
      const product = await productsService.create(name, quantity);
      return res.status(201).json(product);
    } catch (error) {
      const code = 400;
      return res.status(code).json({
        err: {
          message: error,
          code,
        },
      });
    }
  },
};
