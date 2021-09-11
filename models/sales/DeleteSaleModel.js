const { ObjectId } = require('mongodb');
const connection = require('../connection');

class DeleteSaleModel {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    const db = await connection();

    const saleId = new ObjectId(this.id);

    const salesCollection = await db.collection('sales');

    const { value } = await salesCollection.findOneAndDelete({ _id: saleId });

    if (!value) return null;

    return value;
  }
}

module.exports = DeleteSaleModel;
