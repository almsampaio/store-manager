const GetProductByName = require('../../models/products/GetProductByName');
const RegisterProductModel = require('../../models/products/RegisterProductModel');

class RegisterProductService {
  constructor({ name, quantity }) {
    this.name = name;
    this.quantity = quantity;
  }

  async handle() {
    const getProductByName = new GetProductByName(this.name);

    const alreadyExistsProduct = await getProductByName.handle();

    if (alreadyExistsProduct) {
      const message = {
        err: {
          code: 'invalidData',
          message: 'Product already exists',
        },
      };

      return message;
    }

    const registerProductModel = new RegisterProductModel({
      name: this.name,
      quantity: this.quantity,
    });

    const registeredProduct = await registerProductModel.handle();

    return registeredProduct;
  }
}

module.exports = RegisterProductService;
