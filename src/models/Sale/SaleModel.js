class SaleModel {
  constructor(productId, quantity) {
    SaleModel.quantityIsValid(quantity);

    this.productId = productId;
    this.quantity = quantity;
  }

  static quantityIsValid(quantity) {
    if (typeof quantity === 'string') {
      throw new Error('Wrong product ID or invalid quantity');
    }

    if (quantity <= 0) {
      throw new Error('Wrong product ID or invalid quantity');
    }

    return true;
  }
}

module.exports = SaleModel;
