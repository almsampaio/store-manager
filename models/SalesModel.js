const DaoGenericMongoDB = require('./daoGeneric');

class SaleModel extends DaoGenericMongoDB {  
  constructor() {
    super('sales');
  }
}

module.exports = SaleModel;