const { ObjectId } = require('mongodb');
const DeleteProductModel = require('../../models/products/DeleteProductModel');

class DeleteProductService {
  async handle(id) {
    if (!ObjectId.isValid(id)) {
      const message = {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      };

      return message;
    }

    const deleteProductModel = new DeleteProductModel(id);

    const deletedProduct = await deleteProductModel.handle(id);

    return deletedProduct;
  }
}

module.exports = DeleteProductService;
