const GetProductByIdService = require('../../services/products/GetProductByIdService');
const httpStatus = require('../../utils/http_status');

class GetProductByIdController {
  static async handle(req, res, next) {
    const { id } = req.params;

    const getByIdService = new GetProductByIdService();

    const product = await getByIdService.handle(id);

    if (product.err) next(product.err);

    res.status(httpStatus.ok).json(product);
  }
}

module.exports = GetProductByIdController;
