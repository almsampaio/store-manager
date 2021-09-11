const { ObjectId } = require('mongodb');
const GetProductByIdModel = require('../../models/products/GetProductByIdModel');

class GetProductByIdService {
  constructor(id) {
    this.id = id;

    this.errorWrongIdFormat = {
        err: {
          code: 'invalidData',
          message: 'Wrong id format',
        },
      };

    this.errorProductAlreadyExists = {
      err: {
        code: 'invalidData',
        message: 'Product already exists',
      },
    };
  }

  async handle() {
    if (!ObjectId.isValid(this.id)) return this.errorWrongIdFormat;

    const getProductByIdModel = new GetProductByIdModel();

    const productById = await getProductByIdModel.handle(this.id);

    if (!productById) return this.errorProductAlreadyExists;

    return productById;
  }
}

module.exports = GetProductByIdService;
