const DaoGenericMongoDB = require('./daoGeneric');

class ProductModel extends DaoGenericMongoDB {
  
  /**
   * Abordagem par instaciar a classe usando new ProductModel().find|getAll|...
   */
  constructor() {
    super('products');
  }

  /**
   * Para não precisar instaciar a classe com new ProductModel
   * @returns new DaoGenericMongoDB('products');
   */
  static dao() {
    return new DaoGenericMongoDB('products');
  }
}

module.exports = ProductModel;