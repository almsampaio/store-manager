const salesServices = require('../../services/salesServices');

// const productsModels = require('../../models/productsModels');

const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};
/*
// VALIDAÇÃO DA QUANTIDADE

// Verifica se a quantidade é válida
const validQuantity = (productsSold) => productsSold.every((ele) => (
  typeof ele.quantity === 'number'
  && ele.quantity > 0
  && ele.quantity !== undefined
  && ele.quantity !== null));

// Middleware para verificação da quantidade
const quantityValidation = async (req, res, next) => {
  const productsSold = req.body;
  const quantityIsValid = validQuantity(productsSold);
  try {
    if (!quantityIsValid) { throw new Error(unprocessable.message); }
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
  next();
};

// VALIDAÇÃO DO ID

// Verifica se o id do produto existe
const idExists = async (id) => {
  const idSearch = await productsModels.getById(id);
  if (idSearch === null
      || idSearch === undefined
      || idSearch === '') { return false; }
  return true;
  // return idSearch;
};

// Itera a verificação em todos os elementos do array
const validId = async (productsSold) => {
  const arrayPromisses = productsSold.map((product) => idExists(product.productId));
  const arrayPromissesResolved = await Promise.all(arrayPromisses);
  return arrayPromissesResolved.every((ele) => ele);
};

// Middleware para verificar se o id do produto existe
const idValidtaion = async (req, res, next) => {
  const productsSold = req.body;
  try {
    const idIsValid = await validId(productsSold);
    if (!idIsValid) { throw new Error(unprocessable.message); }
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
  next();
};
*/
// CRIAÇÃO DO PRODUTO

// Middleware para o cadastro de vendas (sales)
const createSales = async (req, res, _next) => {
  const productsSold = req.body;
  try {
    const data = await salesServices.create(productsSold);
    if (!data) throw new Error(unprocessable.message);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
};

module.exports = { createSales };

/*
// Middleware para o cadastro de vendas (sales)
const createSales = async (req, res, _next) => {
  const productsSold = req.body;
  const idIsValid = await validId(productsSold);
  const quantityIsValid = validQuantity(productsSold);

  if (!quantityIsValid) { throw new Error(unprocessable.message); }
  if (!idIsValid) { console.log('ids não encontrados'); }
  if (quantityIsValid) { console.log('quantidade válida'); }
  if (idIsValid) { console.log('ids encontrados'); }

  // console.log(validQuantity(productsSold));
  return res.status(unprocessable.status).json('gravado!');
  // try {
  //   const data = await salesServices.create(productsSold);
  //   if (!data) throw new Error(unprocessable.message);
  //   return res.status(200).json(data);
  // } catch (error) {
  //   return res.status(unprocessable.status).json({
  //     err: { code: unprocessable.code, message: error.message },
  //   });
  // }
};
*/
