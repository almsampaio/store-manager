const DeleteProductService = require('../../services/products/DeleteProductService');
const http_status = require('../../utils/http_status');

class DeleteProductController {
  async handle(req, res, next) {
    const { id } = req.params;

    const deleteProductService = new DeleteProductService();

    const deletedProduct = await deleteProductService.handle(id);

    if (deletedProduct.err) next(deletedProduct.err);

    res.status(http_status.ok).json(deletedProduct);
  }
}

module.exports = DeleteProductController;
