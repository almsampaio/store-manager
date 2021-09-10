const CreateSalesModel = require('../../models/sales/CreateSalesModel');
const UpdateProductBySaleModel = require('../../models/sales/UpdateProductBySaleModel');
const GetProductByIdModel = require('../../models/products/GetProductByIdModel');

class CreateSalesService {
  async updateSaleModel(productsSale) {
    const upateProductBySaleModel = new UpdateProductBySaleModel();

    for (const sale of productsSale) {
      await upateProductBySaleModel.handle(sale);
    }
  }

  async checkQuantityStock({ itensSold }) {
    let biggerThenStock = false;

    for (const item of itensSold) {
      const getProductByIdModel = new GetProductByIdModel();

      const { quantity } = await getProductByIdModel.handle(item.productId);

      if (item.quantity > quantity) {
        biggerThenStock = true;
        break;
      }
    }

    if (biggerThenStock) {
      const message = {
        err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
      };

      return message;
    }

    return { message: 'ok' };
  }

  async handle(productsSale) {
    const createSalesModel = new CreateSalesModel();

    const sales = {
      itensSold: productsSale,
    };

    const result = await this.checkQuantityStock(sales);

    if (result.err) return result;

    const results = await createSalesModel.handle(sales);

    await this.updateSaleModel(productsSale);

    return results;
  }
}

module.exports = CreateSalesService;
