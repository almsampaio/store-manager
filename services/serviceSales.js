const Model = require('../models');
const { errorSales, errorSaleId, errorSaleNotFound, errorStock } = require('../utils/objectError');

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => quantity >= 1;

const validateId = (id) => {
  const regexId = /^.{24}$/;

  return regexId.test(id);
};

const stockValidate = (stock) => {
  stock.forEach((product) => {
    if (!product) return true;
  });
  return false;
};

const saleData = async (sales, dataSales) => {
  dataSales.forEach(async ({ productId, quantity }) => {
    sales.push(await Model.products.productById(productId));
  
    if (!validateTypeQuantity(quantity)) return true;
    
    if (!validateQuantity(quantity)) return true;
  });
  return false;
};

const stockQuantityValidate = (stock, dataSales) => {
  stock.forEach((_product, index) => {
    if (stock[index].quantity < dataSales[index].quantity) return true;
  });
  return false;
};

const stockSaleUpdated = async (stock, dataSales) => {
  stock.forEach(async ({ _id, name, quantity }, index) => {
    await Model.products.updateProduct(
      _id,
      { 
        name,
        quantity: (quantity - dataSales[index].quantity),
      },
    );
  });
};

const addSales = async (dataSales) => {
  const dataError = false;
  const stockError = false;
  const sales = [];

  saleData(sales, dataSales);

  const stock = await Promise.all(sales);

  stockValidate(stock);

  if (dataError) return errorSales;

  stockQuantityValidate(stock, dataSales);

  if (stockError) return errorStock;

  stockSaleUpdated(stock, dataSales);

  const salesProduct = await Model.sales.addSales(dataSales);

  return salesProduct;
};

const getSales = async () => {
  const sale = await Model.sales.getSales();

  return sale;
};

const getSaleById = async (id) => {
  if (!validateId(id)) return errorSaleNotFound;

  const sale = await Model.sales.getSaleById(id);

  if (!sale) return errorSaleNotFound;

  return sale;
};

const saleQuantityProduct = async (sales, saleUpdated) => {
  saleUpdated.forEach(async ({ productId, quantity }) => {
    if (!validateTypeQuantity(quantity)) return true;

    if (!validateQuantity(quantity)) return true;

    sales.push(await Model.products.productById(productId));
  });
  return false;
};

const stockQuantity = (stock, saleUpdated, saleOld) => {
  stock.forEach((_product, index) => {
    if (stock[index].quantity 
      < (saleUpdated[index].quantity - saleOld.itensSold[index].quantity)) { 
      return true; 
}
  });
  return false;
};

const stockUpdated = async (stock, saleUpdated, saleOld) => {
  stock.forEach(async ({ _id, name, quantity }, index) => {
    await Model.products.updateProduct(
      _id,
      {
        name,
        quantity: quantity - (saleUpdated[index].quantity - saleOld.itensSold[index]),
      },
    );
  });
};

const updateSale = async (id, saleUpdated) => {
  let dataError = false;
  const stockError = false;
  const sales = [];
  
  if (!validateId(id)) return errorSales;
  
  const stock = await Promise.all(sales);

  stockValidate(stock);

  dataError = saleQuantityProduct(sales, saleUpdated);

  if (dataError) return errorSales;

  const saleOld = await Model.sales.saleById(id);

  stockQuantity(stock, saleUpdated, saleOld);

  if (stockError) return errorStock;

  stockUpdated(stock, saleUpdated, saleOld);

  const sale = await Model.sales.updateSale(id, { itensSold: saleUpdated });

  return (sale.matchedCount === 1) ? { _id: id, itensSold: saleUpdated } : errorSales;
};

const deleteSale = async (id) => {
  const sales = [];

  if (!validateId(id)) return errorSaleId;

  const saleDeleted = await Model.sales.getSaleById(id);

  const sale = await Model.sales.deleteSale(id);

  saleDeleted.itensSold.forEach(({ productId }) => {
    sales.push(Model.products.productById(productId));
  });

  const stock = await Promise.all(sales);

  stock.forEach(async ({ _id, name, quantity }, index) => {
    await Model.products.updateProduct(
      _id,
      {
        name,
        quantity: quantity + saleDeleted.itensSold[index].quantity,
      },
    );
  });

  return (sale.deletedCount === 1) ? saleDeleted : errorSaleId;
};

module.exports = {
  addSales,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
};