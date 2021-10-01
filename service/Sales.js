const Sales = require('../models/Sales');
const Product = require('../models/Products');

const getAllSales = async () => {
    const sales = await Sales.getAllSales();
    return { status: 200, data: sales };
};

const getById = async (id) => {
    const sale = await Sales.getById(id);
    const message = 'Sale not found';

    if (!sale) return { status: 404, message };
    return { status: 200, data: sale };
  };

  const updateItensSales = async (id, quantyti) => {
    const product = await Product.getById(id);
    const newQuantyti = product.quantity - quantyti;
    await Product.updateProduct(id, product.name, newQuantyti);
  };

  const createSales = async (sale) => {
    const product = sale[0];
    await updateItensSales(product.productId, product.quantity);
    const sales = await Sales.createSales(sale);
    return { status: 200, data: sales };
};

 const updateSales = async (id, itensSold) => {
   const sales = await Sales.updateSales(id, itensSold);
    return { status: 200, data: sales };
}; 

const updateItensSalesIncrement = async (id, quantyti) => {
  const product = await Product.getById(id);
  const newQuantyti = product.quantity + quantyti;
  await Product.updateProduct(id, product.name, newQuantyti);
};

const deleteSales = async (id) => {
  const message = 'Wrong sale ID format';
  const products = await Sales.getById(id);
  if (!products) return { status: 422, message }; 
  const { itensSold } = products;
  await itensSold.forEach((element) => {
  updateItensSalesIncrement(element.productId, element.quantity);
  });
    const result = await Sales.deleteSales(id);
    return { status: 200, data: result };
  };

module.exports = { getAllSales, getById, createSales, updateSales, deleteSales };  