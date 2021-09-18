// Conectando a camada Controllers com a camada Models
const vendasModel = require('../models/vendasModel');
// Conectando a camada Controllers com a camada Services
const vendasService = require('../services/vendasService');

// Mensagens
const maiorIgualUm = 'Wrong product ID or invalid quantity';
const serNumero = 'Wrong product ID or invalid quantity';
const naoEncontrado = 'Sale not found';

const listarVendas = async (_req, res) => {
  const vendas = await vendasModel.listarVendas();
  return res.status(200).json(vendas);
};  

const listarVendaPorID = async (req, res) => {
  const { id } = req.params;
  const venda = await vendasService.listarVendaPorID(id);
  if (venda === 'não encontrado') {
    return res.status(404).json({ err: { code: 'not_found', message: naoEncontrado } });
  }
  return res.status(200).json(venda);
};

const criarVenda = async (req, res) => {
  const itensVendidos = req.body;
  const venda = await vendasService.criarVenda(itensVendidos);
  
  if (venda === 'menor ou igual a zero') {
    return res.status(422).json({ err: { code: 'invalid_data', message: maiorIgualUm } });
  }
  if (venda === 'NaN') {
    return res.status(422).json({ err: { code: 'invalid_data', message: serNumero } });
  }

  return res.status(200).json(venda);
};

const atualizarVenda = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;
  const venda = await vendasService.atualizarVenda(id, productId, quantity);
  
  if (venda === 'menor ou igual a zero') {
    return res.status(422).json({ err: { code: 'invalid_data', message: maiorIgualUm } });
  }
  if (venda === 'NaN') {
    return res.status(422).json({ err: { code: 'invalid_data', message: serNumero } });
  }
  return res.status(200).json(venda);
};

const deletarVenda = async (req, res) => {
  const { id } = req.params;
  const venda = await vendasService.deletarVenda(id);
  if (venda === 'não encontrado') {
    return res.status(422).json({ err: { code: 'invalid_data', message: naoEncontrado } });
  }
  return res.status(200).json(venda);
};

module.exports = {
  listarVendas,
  listarVendaPorID,
  criarVenda,
  atualizarVenda,
  deletarVenda,
};