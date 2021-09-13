const StockProblem = require('../errors/StockProblem');
const ProductModel = require('../models/ProductModel');
const SaleModel = require('../models/SalesModel');
const { isValidId } = require('./validationService');

new SaleModel().createCounter();
/**
 * 
 * @param {Array<{productId: string, quantity: number}>} sale 
 * @returns Promise<boolean>
 */
const productsIdExists = async (sale) => {
  const idsExists = await Promise.all(sale.map(async (product) => {
    if (!isValidId(product.productId)) return false;

    const productExists = await new ProductModel().findByID(product.productId);

    return !!productExists;
  }));
  return idsExists.every((ids) => ids === true);
};

function isValidQuantity(quantity, quantitySale) {
  if (quantity - quantitySale < 0) throw new StockProblem();
  return quantity - quantitySale;
}

const subtractProductsQuantity = async (sale) => {
  let saleUpdated = null;
    saleUpdated = await Promise.all(sale.map(async ({ productId, quantity }) => {
      if (!isValidId(productId)) return false;

      const product = await new ProductModel().findByID(productId);
      isValidQuantity(product.quantity, quantity);

      const productExists = await new ProductModel()
        .findOneAndUpdateNotSet(productId, { $inc: { quantity: -(quantity) } });
      return productExists;
    }));
  return saleUpdated;
};

const addProductsQuantity = async (sale) => {
  let saleUpdated = null;
  try {
    saleUpdated = await Promise.all(sale.map(async ({ productId, quantity }) => {
      if (!isValidId(productId)) return false;

      const productExists = await new ProductModel()
        .findOneAndUpdateNotSet(productId, { $inc: { quantity } });
      return productExists;
    }));
  } catch (err) { console.error(err); }
  return saleUpdated;
};

const productsQuantityGTEOne = (sale) => sale.every(({ quantity }) => quantity > 0);

const existsSaleById = async (id) => {
  const sale = await new SaleModel().findByID(id);
  return sale;
};

module.exports = {
  productsIdExists,
  productsQuantityGTEOne,
  existsSaleById,
  subtractProductsQuantity,
  addProductsQuantity,
};
