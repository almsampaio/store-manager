const GetAllProductsModel = require('../../models/products/GetAllProductsModel');

class GetAllProdutsService {
  static async handle() {
    const allProducts = await GetAllProductsModel.handle();

    return { products: allProducts };
  }
}

module.exports = GetAllProdutsService;
