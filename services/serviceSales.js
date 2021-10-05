const Model = require('../models');
const { errorSales, errorSaleId, errorSaleNotFound, errorStock } = require('../utils/objectError');

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => quantity >= 1;

const validateId = (id) => {
  const idLength = 24;

  return (id.length < idLength);
};

const salesData = async (dataSales) => {
  let dataError = false;
  const sales = [];

  const stock = await Promise.all(sales);

  dataSales.forEach(async ({ productId, quantity }) => {
    sales.push(Model.products.productById(productId));
  
    if (!validateTypeQuantity(quantity)) dataError = true;
    
    if (!validateQuantity(quantity)) dataError = true;
  });

  stock.forEach((product) => {
    if (!product) dataError = true;
  });

  if (dataError) return errorSales;
};

const addSales = async (dataSales) => {
  let stockError = false;
  const sales = [];

  salesData();

  const stock = await Promise.all(sales);

  stock.forEach((_product, index) => {
    if (stock[index].quantity < dataSales[index].quantity) stockError = true;
  });

  if (stockError) return errorStock;

  stock.forEach((product, index) => {
    Model.products.updateProduct(
      product.id,
      { name: product.name, quantity: (product.quantity - dataSales[index].quantity) },
    );
  });

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

const stockForEach = async (saleUpdated) => {
  let dataError = false;
  const sales = [];
  
  const stock = await Promise.all(sales);
  
  stock.forEach((product) => {
    if (!product) dataError = true;
  });
  saleUpdated.forEach(async ({ productId, quantity }) => {
    if (!validateTypeQuantity(quantity)) dataError = true;

    if (!validateQuantity(quantity)) dataError = true;

    sales.push(Model.products.productById(productId));
  });
};

const updatedSale = async (id, saleUpdated) => {
  const dataError = false;
  
  if (!validateId(id)) return errorSales;
  
  if (dataError) return errorSales;

  stockForEach(saleUpdated);
};

const forEachStock = async (id, saleUpdated) => {
  const sales = [];

  const saleOld = await Model.sales.saleById(id);

  const stock = await Promise.all(sales);

  stock.forEach(({ _id, name, quantity }, index) => {
    Model.products.updateProduct(
      _id,
      {
        name,
        quantity: quantity - (saleUpdated[index].quantity - saleOld.itensSold[index]),
      },
    );
  });
};

const updateSale = async (id, saleUpdated) => {
  let stockError = false;
  const sales = [];

  const saleOld = await Model.sales.saleById(id);
  
  updatedSale();
  forEachStock();

  const stock = await Promise.all(sales);

  stock.forEach((_product, index) => {
    if (stock[index].quantity 
      < (saleUpdated[index].quantity - saleOld.itensSold[index].quantity)) { 
      stockError = true; 
    }
  });

  if (stockError) return errorStock;

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

  stock.forEach(({ _id, name, quantity }, index) => {
    Model.products.updateProduct(
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