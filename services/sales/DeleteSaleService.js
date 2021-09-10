const { ObjectId } = require('mongodb');
const DeleteSaleModel = require('../../models/sales/DeleteSaleModel');
const GetSaleModel = require('../../models/sales/GetSaleModel');
const UpdateProductBySaleModel = require('../../models/sales/UpdateProductBySaleModel');

class DeleteSaleService {
  async updateSaleModel({ itensSold }) {
    const upgradeProductBySaleModel = new UpdateProductBySaleModel();

    for (const sale of itensSold) {
      await upgradeProductBySaleModel.handle(sale, false);
    }
  }

  async handle(id) {
    const message = {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };

    if (!ObjectId.isValid(id)) return message;

    const deleteSaleModel = new DeleteSaleModel();

    const deletedSale = await deleteSaleModel.handle(id);

    if (!deletedSale) return message;

    await this.updateSaleModel(deletedSale);

    return deletedSale;
  }
}

module.exports = DeleteSaleService;
