const CreateSalesService = require('../../services/sales/CreateSalesService');
const http_status = require('../../utils/http_status');

class CreateSalesController {
  async handle(req, res, next) {
    const productsSale = req.body;

    const createSalesService = new CreateSalesService();

    const results = await createSalesService.handle(productsSale);

    if (results.err) next(results.err);

    res.status(http_status.ok).json(results);
  }
}

module.exports = CreateSalesController;
