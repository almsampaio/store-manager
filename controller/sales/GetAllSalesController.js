const GetAllSalesService = require('../../services/sales/GetAllSalesService');
const httpStatus = require('../../utils/http_status');

class GetAllSalesController {
  static async handle(_req, res) {
    const allProducts = await GetAllSalesService.handle();

    res.status(httpStatus.ok).json(allProducts);
  }
}

module.exports = GetAllSalesController;
