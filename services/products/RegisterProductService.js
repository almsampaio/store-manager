const GetProductByName = require('../../models/products/GetProductByName');
const RegisterProductModel = require('../../models/products/RegisterProductModel');

class RegisterProductService {
  async handle({ name, quantity }) {
    const registerProductModel = new RegisterProductModel();
    const getProductByName = new GetProductByName();

    const alreadyExistsProduct = await getProductByName.handle(name);

    if (alreadyExistsProduct) {
      const message = {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      };

      return message;
    }

    const registeredProduct = await registerProductModel.handle({ name, quantity });

    return registeredProduct;
  }
}

module.exports = RegisterProductService;
