const salesModel = require('../models/salesModel');
const validations = require('./validations');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesById = async (id) => {
  const sale = await salesModel.getSalesById(id);

  if (!sale) {
    const errorMessage = validations.validateSaleNotFound();
    return { errorMessage };
  }

  return { sale };
};

const createSale = async (sales) => {
  let newProd = null;

  try {
    await Promise.all(sales.map(async ({ productId, quantity }) => {
      const verifyProd = await validations.validateSale(productId, quantity);

      if (verifyProd !== null) {
        newProd = verifyProd.errorMessage;
      }
    }));
  } catch (error) {
    console.error('erro');
  }

  if (newProd !== null) {
    return { errorMessage: newProd };
  }

  const prodSale = await salesModel.createSale(sales);

  return { prodSale };
};

const updateSale = async (id, sale) => {
  console.log(sale);
  const [{ productId, quantity }] = sale;

  try {
    const errorMessage = await validations.validateSale(productId, quantity);
  
    if (errorMessage) {
      return errorMessage;
    }
  } catch (error) {
    console.error('erro');
  }

  await salesModel.updateSale(id, sale);

  const updatedSale = await salesModel.getSalesById(id);

  return { updatedSale };
};

const removeSale = async (id) => {
  const { removedSale, errorMessage } = await validations.validateSaleId(id);

  if (errorMessage) {
    return { errorMessage };
  }

  await salesModel.removeSale(id);
  
  return { removedSale };

  // const teste = await validations.validateSaleId(id);

  // if (teste.errorMessage) return { errorMessage: teste.errorMessage };
  
  // await salesModel.removeSale(id);
  
  // return { removedSale: teste.removeSale };
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  updateSale,
  removeSale,
};
