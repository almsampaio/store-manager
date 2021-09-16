const { ObjectId } = require('bson');
const conexao = require('./conexao');

const listarProdutos = async () => {
  const db = await conexao();
  const produtos = await db.collection('products').find({}).toArray();
  return produtos;
};

const listarProdutosPorID = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const produto = await db.collection('products').findOne({ _id: ObjectId(id) });
  return produto;
};

const criarProduto = async (name, quantity) => {
  const db = await conexao();
  const produto = await db.collection('products').insertOne({ name, quantity });
  return { _id: produto.insertedId, name, quantity };
};

const atualizarProduto = async (id, name, quantity) => {
  const db = await conexao();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } }
  );
  return { _id: id, name, quantity };
};

const deletarProduto = async (id) => {
  const db = await conexao();
  const produto = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });
  return produto;
};

const buscarPeloNome = async (name) => {
  const db = await conexao();
  const buscar = await db.collection('products').findOne({ name });
  return buscar;
};

module.exports = {
  listarProdutos,
  listarProdutosPorID,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  buscarPeloNome,
};