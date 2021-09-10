const GetAllProdutsService = require('../../services/products/GetAllProductsService');
const http_status = require('../../utils/http_status');

class GetAllProdutsController {
  async handle(_req, res) {
    const getAllProdutsService = new GetAllProdutsService();

    const allProducts = await getAllProdutsService.handle();

    res.status(http_status.ok).json(allProducts);
  }
}

module.exports = GetAllProdutsController;
