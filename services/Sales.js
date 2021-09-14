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
    return createdSales;
  },
};
