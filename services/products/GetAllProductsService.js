const GetAllProductsModel = require('../../models/products/GetAllProductsModel');

class GetAllProdutsService {
  async handle() {
    const getAllProductsModel = new GetAllProductsModel();

    const allProducts = await getAllProductsModel.handle();

    return { products: allProducts };
  }
}

module.exports = GetAllProdutsService;
