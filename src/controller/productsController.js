const productService = require('../service/productService');

module.exports = {
  async create(request, response) {
    const { name, quantity } = request.body;

    const newProduct = await productService.create(name, quantity);

    return response.status(201).json(newProduct);
  },

  async index(request, response) {
    const { id } = request.params;

    if (id) {
      const product = await productService.index(id);

      return response.status(200).json(product);
    }

    const products = await productService.index();

    return response.status(200).json({ products });
  },

  async update(request, response) {
    const { id } = request.params;
    const { name, quantity } = request.body;
    
    const updatedProduct = await productService.update(id, name, quantity);

    return response.status(200).json(updatedProduct);
  },

  async delete(request, response) {
    const { id } = request.params;

    const deletedProduct = await productService.delete(id);

    return response.status(200).json(deletedProduct);
  },
};
