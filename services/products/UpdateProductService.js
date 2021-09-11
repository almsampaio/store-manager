const UpdateProductModel = require('../../models/products/UpdateProductModel');

class UpdateProductService {
  constructor({ id, name, quantity }) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }

  async handle() {
    const updateProductModel = new UpdateProductModel({
      id: this.id,
      name: this.name,
      quantity: this.quantity,
    });

    const updatedProductModel = await updateProductModel.handle();

    return updatedProductModel;
  }
}

module.exports = UpdateProductService;
