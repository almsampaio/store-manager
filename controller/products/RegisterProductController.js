const RegisterProductService = require('../../services/products/RegisterProductService');
const http_status = require('../../utils/http_status');

class RegisterProductController {
  async handle(req, res, next) {
    const { name, quantity } = req.body;

    const registerProductService = new RegisterProductService();

    const product = await registerProductService.handle({ name, quantity });

    if (product.err) next(product.err);

    res.status(http_status.created).json(product);
  }
}

module.exports = RegisterProductController;
