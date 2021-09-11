const GetAllSalesModel = require('../../models/sales/GetAllSalesModel');

class GetAllSalesService {
  static async handle() {
    const allProducts = await GetAllSalesModel.handle();

    return { sales: allProducts };
  }
}

module.exports = GetAllSalesService;
