const { ObjectId } = require('mongodb');

const db = require('../models/salesModel');

const isValidQuantity = (sale) => {
  const { quantity } = sale;
  return (typeof (quantity) === 'number' && Number.isInteger(quantity)) && quantity > 0;
};

const createNewSalesValidations = async (sales) => {
  const quantityValidations = sales.every(isValidQuantity);
  
  if (!quantityValidations) {
  return { err: { code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' } }; 
}

  return true;
};

const createNewSales = async (sales) => {
  const allValidations = await createNewSalesValidations(sales);
  if (!allValidations.err) {
    const response = await db.createNewSales(sales);
    return response;
  }
  return allValidations;
};

const getAllSales = async () => {
  const sales = await db.getAllSales();
  return sales;
};

const getSaleByID = async (id) => {
  if (ObjectId.isValid(id)) {
    const saleByID = await db.getSaleByID(id);
    if (saleByID) return saleByID;
  }
  return { err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};
};

const updateSaleByIDValidations = async (id, productId, quantity) => {
  const quantityValidations = isValidQuantity({ quantity });
  
  if (!quantityValidations || !ObjectId.isValid(id) || !ObjectId.isValid(productId)) {
  return { err: { code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity' } }; 
}

  return true;
};

const updateSaleByID = async (id, productId, quantity) => {
  const allValidations = await updateSaleByIDValidations(id, productId, quantity);
  if (allValidations.err) return allValidations;

  const updateSale = await db.updateSaleByID(id, productId, quantity);

  if (updateSale) {
    return updateSale;
  } 
  return {
    err: {
      code: 'invalid_data', message: 'Id does not exist',
    },
  };
};

const deleteSalestByIDValidations = async (id) => {
  const alreadyExist = await getSaleByID(id);
  
  if (alreadyExist.err) return alreadyExist;

  return alreadyExist;
};

const deleteSalestByID = async (id) => {
  const allValidations = await deleteSalestByIDValidations(id);

  if (allValidations.err) {
    return {
      err: { code: 'invalid_data', message: 'Wrong sale ID format',
    },
    };
  }

  const deletedSales = await db.deleteSalestByID(id);

  return deletedSales;
};

module.exports = {
  createNewSales,
  getAllSales,
  getSaleByID,
  updateSaleByID,
  deleteSalestByID,
};
