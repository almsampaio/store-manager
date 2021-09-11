const GetAllProdutsService = require('../../services/products/GetAllProductsService');
const httpStatus = require('../../utils/http_status');

class GetAllProdutsController {
  static async handle(_req, res) {
    const allProducts = await GetAllProdutsService.handle();

    res.status(httpStatus.ok).json(allProducts);
  }
}

module.exports = GetAllProdutsController;
