const UpdateProductService = require('../../services/products/UpdateProductService');
const httpStatus = require('../../utils/http_status');

class UpdateProductController {
  static async handle(req, res) {
    const { id } = req.params;

    const { name, quantity } = req.body;

    const updateProductService = new UpdateProductService();

    const updatedProduct = await updateProductService.handle({ id, name, quantity });

    res.status(httpStatus.ok).json(updatedProduct);
  }
}

module.exports = UpdateProductController;
