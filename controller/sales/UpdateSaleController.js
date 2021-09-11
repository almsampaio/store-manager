const UpdateSaleService = require('../../services/sales/UpdateSaleService');
const httpStatus = require('../../utils/http_status');

class UpdateSaleController {
  static async handle(req, res) {
    const { id } = req.params;

    const sales = req.body;

    const updateSaleService = new UpdateSaleService(id, sales);

    const updatedSale = await updateSaleService.handle();

    res.status(httpStatus.ok).json(updatedSale);
  }
}

module.exports = UpdateSaleController;
