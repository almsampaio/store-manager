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
      const sales = await salesService.index(id);

      return response.status(200).json({ sales });
    }

    const sales = await salesService.index();

    return response.status(200).json({ sales });
  },

  async update(request, response) {
    const { id } = request.params;
    const itensSold = request.body;

    const updatedSale = await salesService.update(id, itensSold);

    return response.status(200).json(updatedSale);
  },

  async delete(request, response) {
    const { id } = request.params;

    const deletedSale = await salesService.delete(id);

    return response.status(200).json(deletedSale);
  },
};
