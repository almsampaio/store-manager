const Model = require('../models');

const ERROR_CODE_400 = 'invalid_data';
const ERROR_CODE_401 = 'stock_problem';
const ERROR_CODE_404 = 'not_found';
const ERROR_SALES = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong product ID or invalid quantity',
} };
const ERROR_NOT_FOUND = { err: {
  code: ERROR_CODE_404,
  message: 'Sale not found',
} };
const ERROR_SALE_ID = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong sale ID format',
} };
const ERROR_STOCK = { err: {
  code: ERROR_CODE_401,
  message: 'Such amount is not permitted to sell',
} };

const quantityTypeValidator = (quantity) => typeof (quantity) === 'number';

const quantityValidator = (quantity) => quantity >= 1;

const idValidator = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const testErrorData = async (salesData) => {
  let errorData = false;
  const sale = [];

  salesData.forEach(({ productId, quantity }) => {
    sale.push(Model.products.getProductById(productId));

    if (!quantityTypeValidator(quantity)) errorData = true;

    if (!quantityValidator(quantity)) errorData = true;
  });

  const stock = await Promise.all(sale);

  stock.forEach((product) => {
    if (!product) errorData = true;
  });

  return { errorData, stock };
};

const addSales = async (salesData) => {
  const { errorData, stock } = testErrorData(salesData);
  let errorStock = false;

  if (errorData) return ERROR_SALES;

  stock.forEach((_product, index) => {
    if (stock[index].quantity < salesData[index].quantity) errorStock = true;
  });

  if (errorStock) return ERROR_STOCK;

  stock.forEach((product, index) => {
    Model.products.updateProduct(
      product.id,
      { name: product.name, quantity: (product.quantity - salesData[index].quantity) },
    );
  });

  return Model.sales.addSales(salesData);
};

const getSales = async () => Model.sales.getSales();

const getSaleById = async (id) => {  
  if (!idValidator(id)) return ERROR_NOT_FOUND;

  const product = await Model.sales.getSaleById(id);

  if (!product) return ERROR_NOT_FOUND;

  return product;
};

const testUpdatedSale = async (updatedSale) => {
  let errorData = false;
  const sales = [];
  updatedSale.forEach(({ productId, quantity }) => {
    if (!quantityTypeValidator(quantity)) errorData = true;

    if (!quantityValidator(quantity)) errorData = true;

    sales.push(Model.products.getProductById(productId));
  });

  const stock = await Promise.all(sales);

  stock.forEach((product) => {
    if (!product) errorData = true;
  });

  return { errorData, stock };
};

const testUpdatedStock = (stock, oldSale, updatedSale) => {
  let errorStock = false;
  stock.forEach((_product, index) => {
    if (stock[index].quantity
      < (updatedSale[index].quantity - oldSale.itensSold[index].quantity)) {
      errorStock = true;
    } 
  });
  return errorStock;
};

const updateSale = async (id, updatedSale) => {
  const { errorData, stock } = testUpdatedSale(updatedSale);
  
  if (!idValidator(id)) return ERROR_SALES;
  
  if (errorData) return ERROR_SALES;
  
  const oldSale = await Model.sales.getSaleById(id);
  
  const errorStock = testUpdatedStock(stock, oldSale, updatedSale);
  if (errorStock) return ERROR_STOCK;

  stock.forEach((product, index) => {
    Model.products.updateProduct(
      product.id,
      {
        name: product.name,
        quantity: product.quantity
        - (updatedSale[index].quantity - oldSale.itensSold[index].quantity),
      },
    );
  });

  const sale = await Model.sales.updateSale(id, { itensSold: updatedSale });

  return (sale.matchedCount === 1) ? { _id: id, itensSold: updatedSale } : ERROR_SALES;
};

const deleteSale = async (id) => {
  if (!idValidator(id)) return ERROR_SALE_ID;

  const deletedSale = await Model.sales.getSaleById(id);

  const sale = await Model.sales.deleteSale(id);

  const sales = [];

  deletedSale.itensSold.forEach(({ productId }) => {
    sales.push(Model.products.getProductById(productId));
  });

  const stock = await Promise.all(sales);

  stock.forEach((product, index) => {
    Model.products.updateProduct(
      product.id,
      {
        name: product.name,
        quantity: product.quantity + deletedSale.itensSold[index].quantity,
      },
    );
  });

  return (sale.deletedCount === 1) ? deletedSale : ERROR_SALE_ID;
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};