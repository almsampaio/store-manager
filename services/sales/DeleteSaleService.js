const { ObjectId } = require('mongodb');
const DeleteSaleModel = require('../../models/sales/DeleteSaleModel');
const UpdateProductBySaleModel = require('../../models/sales/UpdateProductBySaleModel');

class DeleteSaleService {
  constructor(id) {
    this.id = id;
  }

  async updateSaleModel() {
    const { itensSold } = this.deletedSale;

    await Promise.all(
      itensSold.map((sale) => {
        const upgradeProductBySaleModel = new UpdateProductBySaleModel(sale);

        return upgradeProductBySaleModel.handle(false);
      }),
    );
  }

  async handle() {
    const message = {
      err: {
        code: 'invalidData',
        message: 'Wrong sale ID format',
      },
    };

    if (!ObjectId.isValid(this.id)) return message;

    const deleteSaleModel = new DeleteSaleModel(this.id);

    this.deletedSale = await deleteSaleModel.handle();

    if (!this.deletedSale) return message;

    await this.updateSaleModel(this.deletedSale);

    return this.deletedSale;
  }
}

module.exports = DeleteSaleService;
