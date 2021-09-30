// const connection = require('../model/connection');
const salesModel = require('../model/salesModel');

module.exports.createSales = async (serviceData) => {
  try {
    const sales = await salesModel.createSales(serviceData);
    return sales;
  } catch (error) {
    console.log('Something went wrong: Service createSales', error);
    throw new Error(error);
  }
};
