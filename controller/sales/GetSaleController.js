const GetSaleService = require('../../services/sales/GetSaleService');
const httpStatus = require('../../utils/http_status');

class GetSaleController {
  static async handle(req, res, next) {
    const { id } = req.params;

    const getSaleService = new GetSaleService(id);

    const sale = await getSaleService.handle();

    if (sale.err) return next(sale.err);

    res.status(httpStatus.ok).json(sale);
  }
}

module.exports = GetSaleController;
