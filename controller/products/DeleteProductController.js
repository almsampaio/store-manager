const DeleteProductService = require('../../services/products/DeleteProductService');
const httpStatus = require('../../utils/http_status');

class DeleteProductController {
  static async handle(req, res, next) {
    const { id } = req.params;

    const deleteProductService = new DeleteProductService();

    const deletedProduct = await deleteProductService.handle(id);

    if (deletedProduct.err) next(deletedProduct.err);

    res.status(httpStatus.ok).json(deletedProduct);
  }
}

module.exports = DeleteProductController;
