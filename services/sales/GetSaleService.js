const { ObjectId } = require('mongodb');
const GetSaleModel = require('../../models/sales/GetSaleModel');

class GetSaleService {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const message = {
      err: {
        code: 'notFound',
        message: 'Sale not found',
      },
    };

    if (!ObjectId.isValid(this.id)) return message;

    const getSaleModel = new GetSaleModel(this.id);

    const sale = await getSaleModel.handle();

    if (!sale) return message;

    return sale;
  }
}

module.exports = GetSaleService;
