class ProductModel {
  constructor(name, quantity) {
    ProductModel.productIsValid(name, quantity);

    this.name = name;
    this.quantity = quantity;
  }

  static productIsValid(name, quantity) {
    const nameIsValidated = ProductModel.nameIsValid(name);
    const quantityIsValidated = ProductModel.quantityIsValid(quantity);

    return nameIsValidated && quantityIsValidated;
  }

  static nameIsValid(name) {
    if (typeof name !== 'string' || name.length <= 5) {
      throw new Error('"name" length must be at least 5 characters long');
    }
    return true;
  }

  static quantityIsValid(quantity) {
    if (typeof quantity !== 'number') {
      throw new Error('"quantity" must be a number');
    }

    if (quantity <= 0) {
      throw new Error('"quantity" must be larger than or equal to 1');
    }

    return true;
  }
}

module.exports = ProductModel;
