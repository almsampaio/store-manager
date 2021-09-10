const { ObjectId } = require('mongodb');
const GetSaleService = require('../../services/sales/GetSaleService');
const http_status = require('../../utils/http_status');

class GetSaleController {
  async handle(req, res, next) {
    const { id } = req.params;

    const getSaleService = new GetSaleService();

    const sale = await getSaleService.handle(id);

    if (sale.err) next(sale.err);

    res.status(http_status.ok).json(sale);
  }
}

module.exports = GetSaleController;
