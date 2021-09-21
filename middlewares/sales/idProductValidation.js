const productsModels = require('../../models/productsModels');

const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

// Verifica se o id do produto existe
const idExists = async (id) => {
  const idSearch = await productsModels.getById(id);
  if (idSearch === null
      || idSearch === undefined
      || idSearch === '') { return false; }
  return true;
  // return idSearch;
};

// Itera a verificação do id em todos os elementos do array
// Se todos os ids existirem, retorna true, se um ou mais ids não existirem, retorna false
const validId = async (productsSold) => {
  const arrayPromisses = productsSold.map((product) => idExists(product.productId)); // gera um array de promessas
  const arrayPromissesResolved = await Promise.all(arrayPromisses); // resolve todas as promessas do array, salvando um array de boleanos
  return arrayPromissesResolved.every((ele) => ele); // verifica o array de boleanos
};

// Middleware para verificar se o id do produto existe
const idProductValidation = async (req, res, next) => {
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

module.exports = { idProductValidation };
