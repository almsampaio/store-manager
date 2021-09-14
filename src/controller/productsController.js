const productService = require('../service/productService');

module.exports = {
  async create(request, response) {
    const { name, quantity } = request.body;

    const newProduct = await productService.create(name, quantity);

    return response.status(201).json(newProduct);
  },
};
