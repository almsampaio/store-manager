const DaoGenericMongoDB = require('./daoGeneric');

class SalesModel extends DaoGenericMongoDB {
  
  /**
   * Abordagem par instaciar a classe usando new SalesModel().find|getAll|...
   */
  constructor() {
    super('sales');
  }

  /**
   * Para não precisar instaciar a classe com new SalesModel
   * @returns new DaoGenericMongoDB('sales');
   */
  static dao() {
    return new DaoGenericMongoDB('sales');
  }
}

module.exports = SalesModel;