const RegisterProductService = require('../../services/products/RegisterProductService');
const httpStatus = require('../../utils/http_status');

class RegisterProductController {
  static async handle(req, res, next) {
    const { name, quantity } = req.body;

    const registerProductService = new RegisterProductService();

    const product = await registerProductService.handle({ name, quantity });

    if (product.err) next(product.err);

    res.status(httpStatus.created).json(product);
  }
}

module.exports = RegisterProductController;
