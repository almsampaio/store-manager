// Conectando a camada Controllers com a camada Models
const produtosModel = require('../models/produtosModel');
// Conectando a camada Controllers com a camada Services
const produtosService = require('../services/produtosService');

const listarProdutos = async (_req, res) => {
  const produtos = await produtosModel.listarProdutos();
  return res.status(200).json(produtos);
};  

const listarProdutosPorID = async (req, res) => {
  const { id } = req.params;
  const produto = await produtosModel.listarProdutosPorID(id);
  return res.status(200).json(produto);
};

const criarProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const produto = await produtosService.criarProduto(name, quantity);
  if (produto === 'menor que cinco') { return res.status(422).json({
    err: { code: 'invalid_data',
    message: '"name" length must be at least 5 characters long' } });
  }
  if (!produto) { return res.status(422).json({
    err: { code: 'invalid_data', message: 'Product already exists' } });
  }
  if (produto === 'menor ou igual a zero') { return res.status(422).json({
    err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });
  }
  if (produto === 'NaN') { return res.status(422).json({
    err: { code: 'invalid_data', message: '"quantity" must be a number' } });
  }
  return res.status(201).json(produto);
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const produto = await produtosModel.atualizarProduto(id, name, quantity);
  return res.status(200).json(produto);
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;
  const produto = await produtosModel.deletarProduto(id);
  return res.status(200).json(produto.value);
};

module.exports = {
  listarProdutos,
  listarProdutosPorID,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};