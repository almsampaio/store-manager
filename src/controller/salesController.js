const salesService = require('../service/salesService');

module.exports = {
  async create(request, response) {
    const sales = request.body;

    const insertedSale = await salesService.create(sales);

    return response.status(200).json({ _id: insertedSale.id, itensSold: sales });
  },

  async index(request, response) {
    const { id } = request.params;

    if (id) {
      const product = await salesService.index(id);

      return response.status(200).json(product);
    }

    const products = await salesService.index();

    return response.status(200).json({ products });
  },

  async update(request, response) {
    const { id } = request.params;
    const { name, quantity } = request.body;

    const updatedProduct = await salesService.update(id, name, quantity);

    return response.status(200).json(updatedProduct);
  },

  async delete(request, response) {
    const { id } = request.params;

    const deletedProduct = await salesService.delete(id);

    return response.status(200).json(deletedProduct);
  },
};
