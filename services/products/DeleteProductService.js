const { ObjectId } = require('mongodb');
const DeleteProductModel = require('../../models/products/DeleteProductModel');

class DeleteProductService {
  constructor(id) {
    this.id = id;
  }

  async handle() {
    if (!ObjectId.isValid(this.id)) {
      const message = {
        err: {
          code: 'invalidData',
          message: 'Wrong id format',
        },
      };

      return message;
    }

    const deleteProductModel = new DeleteProductModel(this.id);

    const deletedProduct = await deleteProductModel.handle();

    return deletedProduct;
  }
}

module.exports = DeleteProductService;
