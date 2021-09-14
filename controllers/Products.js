const httpcodes = require('../lib/httpcodes');
const productsService = require('../services/Products');

module.exports = {
  async create(req, res) {
    const { name, quantity } = req.body;

    try {
      const product = await productsService.create(name, quantity);
      return res.status(201).json(product);
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },
  async get(req, res) {
    const { id } = req.params;
    try {
      const products = await productsService.get(id);
      return res.status(200).json(products);
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const product = await productsService.update(id, req.body);
      return res.status(200).json(product);
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },
  
  async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await productsService.get(id);
      if (!product) throw new Error('Wrong id format');
      await productsService.delete(id);
      return res.status(200).json(product);
    } catch (error) {
      const code = 422;
      return res.status(code).json({
        err: {
          message: error.message,
          code: httpcodes[code],
        },
      });
    }
  },
};
