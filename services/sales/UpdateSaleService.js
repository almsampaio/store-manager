const UpdateSaleModel = require('../../models/sales/UpdateSaleModel');

class UpdateSaleService {
  constructor(id, sales) {
    this.id = id;
    this.sales = sales;
  }

  async handle() {
    const updateSaleModel = new UpdateSaleModel(this.id, this.sales);

    const updatedSale = await updateSaleModel.handle();

    return updatedSale;
  }
}

module.exports = UpdateSaleService;
