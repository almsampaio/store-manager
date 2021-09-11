const CreateSalesService = require('../../services/sales/CreateSalesService');
const httpStatus = require('../../utils/http_status');

class CreateSalesController {
  static async handle(req, res, next) {
    const productsSale = req.body;

    const createSalesService = new CreateSalesService(productsSale);

    const results = await createSalesService.handle();

    if (results.err) return next(results.err);

    res.status(httpStatus.ok).json(results);
  }
}

module.exports = CreateSalesController;
