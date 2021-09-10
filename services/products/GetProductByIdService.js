const { ObjectId } = require('mongodb');
const GetProductByIdModel = require('../../models/products/GetProductByIdModel');

class GetProductByIdService {
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

    const getProductByIdModel = new GetProductByIdModel();

    const productById = await getProductByIdModel.handle(id);

    if (!productById) {
      const message = {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      };

      return message;
    }

    return productById;
  }
}

module.exports = GetProductByIdService;
