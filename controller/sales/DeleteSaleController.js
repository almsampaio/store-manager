const DeleteSaleService = require('../../services/sales/DeleteSaleService');
const http_status = require('../../utils/http_status');

class DeleteSaleController {
  async handle(req, res, next) {
    const { id } = req.params;

    const deleteSaleService = new DeleteSaleService();

    const deletedSale = await deleteSaleService.handle(id);

    if (deletedSale.err) next(deletedSale.err);

    res.status(http_status.ok).json(deletedSale);
  }
}

module.exports = DeleteSaleController;
