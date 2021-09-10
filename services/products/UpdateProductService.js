const UpdateProductModel = require('../../models/products/UpdateProductModel');

class UpdateProductService {
  async handle({ id, name, quantity }) {
    const updateProductModel = new UpdateProductModel();

    const updatedProductModel = await updateProductModel.handle({ id, name, quantity });

    return updatedProductModel;
  }
}

module.exports = UpdateProductService;
