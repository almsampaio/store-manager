const connection = require('../connection');

class GetAllSalesModel {
  static async handle() {
    const db = await connection();

    const salesCollection = await db.collection('sales');

    const allSales = salesCollection.find().toArray();

    return allSales;
  }
}

module.exports = GetAllSalesModel;
