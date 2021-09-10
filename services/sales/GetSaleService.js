const { ObjectId } = require('mongodb');
const GetSaleModel = require('../../models/sales/GetSaleModel');

class GetSaleService {
  async handle(id) {
    const message = {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };

    if (!ObjectId.isValid(id)) return message;

    const getSaleModel = new GetSaleModel();

    const sale = await getSaleModel.handle(id);

    if (!sale) return message;

    return sale;
  }
}

module.exports = GetSaleService;
