const GetAllSalesModel = require('../../models/sales/GetAllSalesModel');

class GetAllSalesService {
  async handle() {
    const getAllSalesModel = new GetAllSalesModel();

    const allProducts = await getAllSalesModel.handle();

    return { sales: allProducts };
  }
}

module.exports = GetAllSalesService;
