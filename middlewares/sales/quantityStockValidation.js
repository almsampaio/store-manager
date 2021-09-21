const productsModels = require('../../models/productsModels');

const unprocessable = {
  status: 404,
  code: 'stock_problem',
  message: 'Such amount is not permitted to sell',
};

// Verifica se a quantidade existe em estoque
const existsQuantityInStock = async (id, quantitySold) => {
  const product = await productsModels.getById(id);
  if (product.quantity >= quantitySold) { return true; }
  return false;
};

// Itera a verificação do id em todos os elementos do array
// Se todos os ids existirem, retorna true, se um ou mais ids não existirem, retorna false
const validQuantityInStock = async (productsSold) => {
  const arrayPromisses = productsSold.map((product) => 
    existsQuantityInStock(product.productId, product.quantity)); // gera um array de promessas
  const arrayPromissesResolved = await Promise.all(arrayPromisses); // resolve todas as promessas do array, salvando um array de boleanos
  return arrayPromissesResolved.every((ele) => ele); // verifica o array de boleanos
};

// Middleware para verificar se a quantidade do produto existe
const quantityStockValidation = async (req, res, next) => {
  const productsSold = req.body;
  try {
    const idIsValid = await validQuantityInStock(productsSold);
    if (!idIsValid) { throw new Error(unprocessable.message); }
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
  next();
};

module.exports = { quantityStockValidation };

// echo '[{"productId": "614745121a2a8beb28afd8b6", "quantity": 3 }, {"productId": "61495cc33ebb7f8665eafa30", "quantity": 1 }]' | http POST :3000/sales
// echo '[{"productId": "61495cc33ebb7f8665eafa30", "quantity": 3 }]' | http POST :3000/sales