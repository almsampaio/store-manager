// Conectando a camada Controllers com a camada Models
const produtosModel = require('../models/produtosModel');
// Conectando a camada Controllers com a camada Services
const produtosService = require('../services/produtosService');

// Mensagens
const maiorQueCinco = '"name" length must be at least 5 characters long';
const jaExiste = 'Product already exists';
const maiorIgualUm = '"quantity" must be larger than or equal to 1';
const serNumero = '"quantity" must be a number';
const naoEncontrado = 'Wrong id format';

const listarProdutos = async (_req, res) => {
  const produtos = await produtosModel.listarProdutos();
  return res.status(200).json(produtos);
};  

const listarProdutosPorID = async (req, res) => {
  const { id } = req.params;
  const produto = await produtosService.listarProdutosPorID(id);
  if (produto === 'não encontrado') {
    return res.status(422).json({ err: { code: 'invalid_data', message: naoEncontrado } });
  }
  return res.status(200).json(produto);
};

const criarProduto = async (req, res) => {
  const { name, quantity } = req.body;
  const produto = await produtosService.criarProduto(name, quantity);
  if (produto === 'menor que cinco') {
    return res.status(422).json({ err: { code: 'invalid_data', message: maiorQueCinco } });
  }
  if (!produto) {
    return res.status(422).json({ err: { code: 'invalid_data', message: jaExiste } });
  }
  if (produto === 'menor ou igual a zero') {
    return res.status(422).json({ err: { code: 'invalid_data', message: maiorIgualUm } });
  }
  if (produto === 'NaN') {
    return res.status(422).json({ err: { code: 'invalid_data', message: serNumero } });
  }
  return res.status(201).json(produto);
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const produto = await produtosService.atualizarProduto(id, name, quantity);
  if (produto === 'menor que cinco') {
    return res.status(422).json({ err: { code: 'invalid_data', message: maiorQueCinco } });
  }
  if (produto === 'menor ou igual a zero') {
    return res.status(422).json({ err: { code: 'invalid_data', message: maiorIgualUm } });
  }
  if (produto === 'NaN') {
    return res.status(422).json({ err: { code: 'invalid_data', message: serNumero } });
  }
  return res.status(200).json(produto);
};

const deletarProduto = async (req, res) => {
  const { id } = req.params;
  const produto = await produtosService.deletarProduto(id);
  if (produto === 'não encontrado') {
    return res.status(422).json({ err: { code: 'invalid_data', message: naoEncontrado } });
  }
  return res.status(200).json(produto);
};

module.exports = {
  listarProdutos,
  listarProdutosPorID,
  criarProduto,
  atualizarProduto,
  deletarProduto,
};