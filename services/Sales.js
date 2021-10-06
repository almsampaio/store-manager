const salesModel = require('../models/Sales');
const productsModel = require('../models/Products');

// err: { message }
const invalidErrorMsg = 'Wrong product ID or invalid quantity';
const notFoundErrorMsg = 'Sale not found';
const invalidSaleErrorMsg = 'Wrong sale ID format';
const stockProblemMsg = 'Such amount is not permitted to sell';

// err: { code }
const invalidCode = 'invalid_data';
const notFoundCode = 'not_found';
const stockCode = 'stock_problem';

const quantityIsValid = (quantity) => {
  const isNumber = typeof quantity === 'number';
  const isValid = quantity > 0;

  if (!isNumber || !isValid) return false;
  return true;
};

const productIsValid = async (productId) => {
  const product = await productsModel.getById(productId);

  if (!product) return false;
  return true;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const saleById = await salesModel.getById(id);

  if (!saleById) return { code: notFoundCode, message: notFoundErrorMsg };

  return saleById;
};

const checkProductStock = async (productId) => {
  const product = await productsModel.getById(productId);

  if (!product) return 0;
  return product.quantity;
};

const saleHasStock = async (salesList) => {
  const productsStock = await Promise.all(
    salesList.map((sale) => checkProductStock(sale.productId)),
  );

  if (!salesList.every((sale, index) => sale.quantity <= productsStock[index])) {
    return false;
  }
  return true;
};

const updateStock = async (salesList) => {
  const hasStock = await saleHasStock(salesList);
  if (!hasStock) return { code: stockCode, message: stockProblemMsg };

  salesList.forEach(async (sale) => {
    const { productId, quantity } = sale;
    const currentStock = await checkProductStock(productId);
    await productsModel.updateProductQty(productId, (currentStock - quantity));
  });
  return {};
};

const addSales = async (salesList) => {
  const isSaleQtyValid = await salesList.map((sale) => sale.quantity).every(quantityIsValid);
  if (!isSaleQtyValid) return { code: invalidCode, message: invalidErrorMsg };

  const isSaleProductValid = await Promise.all(
    salesList.map((sale) => productIsValid(sale.productId)),
  );
  if (!isSaleProductValid.every((e) => e)) return { code: invalidCode, message: invalidErrorMsg };

  // validação para atualizar o stock
  const updateStockResponse = await updateStock(salesList);
  if (updateStockResponse.message) return updateStockResponse;

  const addedSales = await salesModel.addSales(salesList);
  return addedSales;
};

const updateSales = async ({ id, productId, quantity }) => {
  const validQuantity = quantityIsValid(quantity);
  if (!validQuantity) return { code: invalidCode, message: invalidErrorMsg };

  const validProduct = await productIsValid(productId);
  if (!validProduct) return { code: invalidCode, message: invalidErrorMsg };

  const validSale = await getById(id);
  if (validSale.message) return { code: invalidCode, message: invalidErrorMsg };

  const currentStock = await checkProductStock(productId);
  const currentSaleQty = validSale.itensSold.find((i) => i.productId === productId).quantity;
  const newStockQty = currentStock + currentSaleQty - quantity;

  if (newStockQty < 0) return { code: stockCode, message: stockProblemMsg };
  await productsModel.updateProductQty(productId, newStockQty);

  const updatedSales = await salesModel.updateSales({ id, productId, quantity });
  return updatedSales;
};

const deleteSales = async (id) => {
  const validSale = await getById(id);

  if (validSale.message) return { code: invalidCode, message: invalidSaleErrorMsg };

  validSale.itensSold.forEach(async (i) => {
    const currentStock = await checkProductStock(i.productId);
    const newStockQty = currentStock + i.quantity;
    await productsModel.updateProductQty(i.productId, newStockQty);
  });

  await salesModel.deleteSales(id);
  return validSale;
};

module.exports = {
  getAll,
  getById,
  addSales,
  updateSales,
  deleteSales,
};
