const GetProductByIdService = require('../../services/products/GetProductByIdService');
const http_status = require('../../utils/http_status');

class GetProductByIdController {
  async handle(req, res, next) {
    const { id } = req.params;

    const getByIdService = new GetProductByIdService();

    const product = await getByIdService.handle(id);

    if (product.err) next(product.err);

    res.status(http_status.ok).json(product);
  }
}

module.exports = GetProductByIdController;
