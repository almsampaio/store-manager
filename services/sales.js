const { getProduct, updateProduct } = require('../db/models/product');
const { create, getSale, getSales, updateSale, deleteSale } = require('../db/models/sale');

async function createService(data) {
  data.forEach(async (dat) => {
    const product = await getProduct(dat.productId);
    if (!product) throw new Error('Wrong id format');
    if (product) {
      const { _id } = product;
      const newQntd = product.quantity - dat.quantity;
      await updateProduct(_id, { name: product.name, quantity: newQntd });
    }
  });
  const addSale = await create(data);
  return addSale;
}

async function listSalesService(id) {
  if (id) {
    const sale = await getSale(id);
    if (!sale) throw new Error('Wrong id format');
    return sale;
  }
  const sales = await getSales();
  return sales;
}

async function updateSaleService(id, data) {
  const sale = await getSale(id);
  if (!sale) throw new Error('Wrong id format');

  await updateSale(id, data);
  return { _id: id, itensSold: data };
}

async function deleteSaleService(id) {
  const sale = await getSale(id);
  sale.itensSold.forEach(async (dat) => {
    const product = await getProduct(dat.productId);
    if (product) {
      const { _id } = product;
      const newQntd = product.quantity + dat.quantity;
      await updateProduct(_id, { name: product.name, quantity: newQntd });
    }
  });
  await deleteSale(id);

  return { _id: id, itensSold: sale };
}

module.exports = { createService, listSalesService, updateSaleService, deleteSaleService };
