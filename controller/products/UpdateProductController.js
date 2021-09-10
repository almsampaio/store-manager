const UpdateProductService = require('../../services/products/UpdateProductService');
const http_status = require('../../utils/http_status');

class UpdateProductController {
  async handle(req, res) {
    const { id } = req.params;

    const { name, quantity } = req.body;

    const updateProductService = new UpdateProductService();

    const updatedProduct = await updateProductService.handle({ id, name, quantity });

    res.status(http_status.ok).json(updatedProduct);
  }
}

module.exports = UpdateProductController;
