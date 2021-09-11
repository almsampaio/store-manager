const CreateSalesModel = require('../../models/sales/CreateSalesModel');
const UpdateProductBySaleModel = require('../../models/sales/UpdateProductBySaleModel');
const GetProductByIdModel = require('../../models/products/GetProductByIdModel');

class CreateSalesService {
  constructor(productsSale) {
    this.productsSale = productsSale;
  }

  async updateSaleModel() {
    await Promise.all(
      this.productsSale.map((sale) => {
        const upateProductBySaleModel = new UpdateProductBySaleModel(sale);

        return upateProductBySaleModel.handle();
      }),
    );
  }

  async getStocksResult() {
    const { itensSold } = this.sales;

    let biggerThenStock = false;

    const checkStock = async (item) => {
      const getProductByIdModel = new GetProductByIdModel();

      const { quantity } = await getProductByIdModel.handle(item.productId);

      if (item.quantity > quantity) {
        biggerThenStock = true;
      }
    };

    await Promise.all(itensSold.map((item) => checkStock(item)));

    this.biggerThenStock = biggerThenStock;
  }

  async checkQuantityStock() {
    await this.getStocksResult();

    if (this.biggerThenStock) {
      const message = {
        err: {
          code: 'stockProblem',
          message: 'Such amount is not permitted to sell',
        },
      };

      return message;
    }

    return { message: 'ok' };
  }

  async handle() {
    this.sales = {
      itensSold: this.productsSale,
    };

    const result = await this.checkQuantityStock();

    if (result.err) return result;

    const createSalesModel = new CreateSalesModel(this.sales);

    const results = await createSalesModel.handle();

    await this.updateSaleModel(this.productsSale);

    return results;
  }
}

module.exports = CreateSalesService;
