const { ObjectId } = require('mongodb');
const connection = require('../connection');

class UpdateSaleModel {
  constructor(id, sales) {
    this.id = id;
    this.sales = sales;
  }

  async handle() {
    const db = await connection();

    const salesCollection = db.collection('sales');

    const saleId = new ObjectId(this.id);

    const { value } = await salesCollection.findOneAndUpdate(
      { _id: saleId },
      { $set: { itensSold: this.sales } },
      { returnDocument: 'after' },
    );

    return value;
  }
}

module.exports = UpdateSaleModel;
