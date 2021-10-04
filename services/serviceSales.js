const Model = require('../models');
const { errorSales } = require('../utils/objectError');

const validateTypeQuantity = (quantity) => typeof (quantity) === 'number';

const validateQuantity = (quantity) => quantity >= 1;

const addSales = async (dataSales) => {
  let error = false;

  const sales = dataSales.map(({ productId, quantity }) => ({ 
    productId, 
    quantity, 
  }));

  await sales.forEach(async ({ productId, quantity }) => {
    const test = await Model.products.productById(productId);
  
    if (!test) error = true;

    if (!validateTypeQuantity(quantity)) error = true;

    if (!validateQuantity(quantity)) error = true;
  });

  if (error) return errorSales;

  const salesProduct = await Model.sales.addSales(dataSales);

  return salesProduct;
};

module.exports = {
  addSales,
};