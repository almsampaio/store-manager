const validate = require('../lib/validation');
const productsModel = require('../models/Products');
const salesModel = require('../models/Sales');

async function validateIfIsPreviouslyRegistered(sales) {
  const products = await productsModel.get.all();
  const productsIdsFromSales = sales.map((sale) => sale.productId);
  const productsIds = products.map(({ _id }) => String(_id));
  const idsNotRegistered = productsIdsFromSales.filter(
    (id) => !productsIds.includes(id),
  ).join(', ');
  if (idsNotRegistered) {
    throw new Error(
      `It was not possible to register the sales because\
 there are no products registered in these id's: ${idsNotRegistered}`,
    );
  }
}

function wrongProductIdOrInvalidQuantity(...conditions) {
  conditions.forEach((condition) => {
    if (condition) throw new Error('Wrong product ID or invalid quantity');
  });
}

module.exports = {
  async create(sales) {
    await validateIfIsPreviouslyRegistered(sales);
    sales.forEach(({ quantity }) => wrongProductIdOrInvalidQuantity(
      quantity < 1,
      typeof quantity === 'string',
    ));
    const createdSales = await salesModel.create(sales);
    const recalculateProductsQuantity = sales.map(async (sale) => {
      const { name, quantity } = await productsModel.get.byId(sale.productId);
      return productsModel.update(sale.productId, { name, quantity: quantity - sale.quantity });
    });
    await Promise.all(recalculateProductsQuantity);
    return createdSales;
  },

  async get(id) {
    if (id) {
      const sale = await validate.id(id, async () => salesModel.get.byId(id), 'Sale not found');
      return sale;
    }

    const sales = await salesModel.get.all();
    return { sales };
  },

  async update(id, body) {
    const errorMessage = 'Wrong product ID or invalid quantity';
    const foundSale = await salesModel.get.byId(id);
    if (!foundSale) throw new Error('Sale does not exist');
    body.forEach(({ quantity }) => {
      validate.minValue({ quantity }, 1, errorMessage);
      validate.typeOfNumber({ quantity }, errorMessage);
    });
    const product = await salesModel.update(id, body);
    return product;
  },
  
  async delete(id) {
    const sale = await salesModel.get.byId(id);
    const recalculateProductsQuantity = sale.itensSold.map(async (productSale) => {
      const { name, quantity } = await productsModel.get.byId(productSale.productId);
      return productsModel.update(
        productSale.productId, { name, quantity: quantity + productSale.quantity },
      );
    });
    await Promise.all(recalculateProductsQuantity);
    const saleDeleted = await salesModel.delete(id);
    return saleDeleted;
  },
};
