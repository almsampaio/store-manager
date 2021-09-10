const GetAllProdutsService = require('../../services/products/GetAllProductsService');
const httpStatus = require('../../utils/http_status');

class GetAllProdutsController {
  static async handle(_req, res) {
    const getAllProdutsService = new GetAllProdutsService();

    const allProducts = await getAllProdutsService.handle();

    res.status(httpStatus.ok).json(allProducts);
  }
}

module.exports = GetAllProdutsController;
