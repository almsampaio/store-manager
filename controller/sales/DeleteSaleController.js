const DeleteSaleService = require('../../services/sales/DeleteSaleService');
const httpStatus = require('../../utils/http_status');

class DeleteSaleController {
  static async handle(req, res, next) {
    const { id } = req.params;

    const deleteSaleService = new DeleteSaleService(id);

    const deletedSale = await deleteSaleService.handle();

    if (deletedSale.err) return next(deletedSale.err);

    res.status(httpStatus.ok).json(deletedSale);
  }
}

module.exports = DeleteSaleController;
