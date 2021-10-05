const saleModel = require('../models/Sales');
const productModel = require('../models/Products');
const validations = require('../middlewares/productsValidations');

const getAll = async () => {
  const sales = await saleModel.getAll();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  if (sale === false || sale === null) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
  }

  return sale;
};

// sobre o .every https://www.w3schools.com/jsref/jsref_every.asp
// The every() method returns true if all elements in an array pass a test (provided as a function).
// The method executes the function once for each element present in the array:
// If it finds an array element where the function returns a false value, every() returns false (and does not check the remaining values)
// If no false occur, every() returns true
// every() does not execute the function for empty array elements
// every() does not change the original array
// itensSold é o parâmetro que veio do controller; corresponde ao req.body, que é um array;

const create = async (itensSold) => {
  let checkProduct = null;

  itensSold.forEach(({ productId, quantity }) => {
    checkProduct = validations.validateSale(productId, quantity);
  });

  const { notValid, error } = await checkProduct;

  if (notValid) return { notValid };
  if (error) return { error };

  const productSales = await saleModel.create(itensSold);
  return { productSales };
};

const update = async (id, itensSold) => {
  const validateId = await itensSold
    .every((item) => productModel.getProductById(item.productId));
  
  const validadeType = await itensSold.every((item) => typeof item.quantity === 'number');
  const validateCount = await itensSold.every((item) => item.quantity > 0);

  if (!validadeType || !validateCount || !validateId) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  const sale = await saleModel.update(id, itensSold);
  return sale;
};

const deleteSale = async (id) => {
  const { sale, errorMessage } = await validations.verifyIdSale(id);

  if (errorMessage) return { errorMessage };

  const { itensSold } = sale;
  const { productId, quantity } = itensSold[0];

  await validations.increaseProductStock(productId, quantity);

  await saleModel.deleteSale(id);

  return { sale };
};

const treatDifference = async (id, productId, quantity) => {
  const differenceSale = await validations.differenceInSale(id, quantity);

  if (differenceSale < 0) {
    const myError = await validations.decreaseProductStock(productId, -differenceSale);
    if (myError) return { myError };
  } else {
    await validations.increaseProductStock(productId, differenceSale);
  }
};

module.exports = {
  getAll,
  create,
  getSaleById,
  update,
  treatDifference,
  deleteSale,
};
