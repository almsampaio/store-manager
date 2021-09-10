const GetAllSalesService = require('../../services/sales/GetAllSalesService');
const http_status = require('../../utils/http_status');

class GetAllSalesController {
  async handle(_req, res) {
    const getAllSalesServices = new GetAllSalesService();

    const allProducts = await getAllSalesServices.handle();

    res.status(http_status.ok).json(allProducts);
  }
}

module.exports = GetAllSalesController;
