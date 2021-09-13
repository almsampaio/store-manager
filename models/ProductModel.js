const DaoGenericMongoDB = require('./daoGeneric');

class ProductModel extends DaoGenericMongoDB {
  constructor() {
    super('products');
  }
}

module.exports = ProductModel;