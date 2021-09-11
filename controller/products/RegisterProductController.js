const RegisterProductService = require('../../services/products/RegisterProductService');
const httpStatus = require('../../utils/http_status');

class RegisterProductController {
  static async handle(req, res, next) {
    const { name, quantity } = req.body;

    const registerProductService = new RegisterProductService({
      name,
      quantity,
    });

    const product = await registerProductService.handle();

    if (product.err) return next(product.err);

    res.status(httpStatus.created).json(product);
  }
}

module.exports = RegisterProductController;
