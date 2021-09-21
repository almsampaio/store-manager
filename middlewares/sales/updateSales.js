const salesServices = require('../../services/salesServices');
const productsModels = require('../../models/productsModels');

const unprocessable = {
  status: 422,
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
};

// Verifica se nenhum produto ficará com valor negativo
const existsQuantityInStock = async (id, diference) => {
  const product = await productsModels.getById(id);
  const { quantity } = product;
  const quantityTotalInStock = (quantity - diference);
  if (quantityTotalInStock >= 0) { return true; }
  return false; 
};

// Calcula a diferença entre a quantidade de itens da venda (sales) atual com a anterior
const differenceBetweenQuantityValidation = async (newSale, previousSale) => {
  const arrayPromisses = newSale.map((product, index) => {
    const diference = product.quantity - previousSale[index].quantity;
    const id = product.productId;
    return existsQuantityInStock(id, diference);
  });
  const arrayPromissesResolved = await Promise.all(arrayPromisses);
  return arrayPromissesResolved[0];
};

// Itera a verificação do id em todos os elementos do array
// Se todos os ids existirem, retorna true, se um ou mais ids não existirem, retorna false
const validQuantityInStock = async (newSale, previousSale) => {
  const arrayPromisses = newSale.map(() =>
    differenceBetweenQuantityValidation(newSale, previousSale));
  const arrayPromissesResolved = await Promise.all(arrayPromisses); // resolve todas as promessas do array, salvando um array de boleanos
  return arrayPromissesResolved.every((ele) => ele); // verifica o array de boleanos
};

// ATUALIZA O VALOR
// Atualiza o valor na tabela products
const updateQuantityInStock = async (id, quantityReturned) => {
  const product = await productsModels.getById(id);
  const { name, quantity } = product;
  const quantityTotalInStock = (quantity - quantityReturned);
  await productsModels.update(id, name, quantityTotalInStock);
};

// Calcula a diferença entre a quantidade de itens da venda (sales) atual com a anterior
const differenceBetweenQuantity = (newSale, previousSale) => {
  newSale.forEach((product, index) => {
    const diference = product.quantity - previousSale[index].quantity;
    const id = product.productId;
    return updateQuantityInStock(id, diference);
  });
};

// Middleware para editar vendas (sales)
const updateSales = async (req, res, _next) => {
  const salesForUpdate = req.body;
  const { id } = req.params;
  try {
    const { itensSold } = await salesServices.getById(id);
    const quantityIsValid = await validQuantityInStock(salesForUpdate, itensSold);
    if (!quantityIsValid) throw new Error(unprocessable.message);
    const data = await salesServices.update(id, salesForUpdate);
    differenceBetweenQuantity(salesForUpdate, itensSold);
    if (!data) throw new Error(unprocessable.message);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(unprocessable.status).json({
      err: { code: unprocessable.code, message: error.message },
    });
  }
};

module.exports = { updateSales };
