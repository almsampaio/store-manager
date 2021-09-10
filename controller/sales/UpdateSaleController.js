const UpdateSaleService = require('../../services/sales/UpdateSaleService');
const http_status = require('../../utils/http_status');

class UpdateSaleController {
  async handle(req, res) {
    const { id } = req.params;

    const sales = req.body;

    const updateSaleService = new UpdateSaleService();

    const updatedSale = await updateSaleService.handle(id, sales);

    res.status(http_status.ok).json(updatedSale);
  }
}

module.exports = UpdateSaleController;
