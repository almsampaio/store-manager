// Conectando a camada Services com a camada Models
const produtosModel = require('../models/produtosModel');

const criarProduto = async (name, quantity) => {
  // Validar que não é possível criar um produto com o nome menor que 5 caracteres
  if (name.length < 5) return 'menor que cinco';

  // Validar que não é possível criar um produto com o mesmo nome de outro já existente
  const buscarPeloNome = await produtosModel.buscarPeloNome(name);
  if (buscarPeloNome) return false;

  // Validar que não é possível criar um produto com quantidade menor ou igual a zero
  if (quantity <= 0) return 'menor ou igual a zero';

  // Validar que não é possível criar um produto com uma string no campo quantidade
  if (typeof quantity !== 'number') return 'NaN';

  const produto = await produtosModel.criarProduto(name, quantity);
  return produto;
};

module.exports = {
  criarProduto,
}