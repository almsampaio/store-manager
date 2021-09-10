const UpdateSaleModel = require('../../models/sales/UpdateSaleModel');

class UpdateSaleService {
  async handle(id, sales) {
    const updateSaleModel = new UpdateSaleModel();

    const updatedSale = await updateSaleModel.handle(id, sales);

    return updatedSale;
  }
}

module.exports = UpdateSaleService;
