const { ObjectId } = require('bson');
const conexao = require('./conexao');

const listarVendas = async () => {
  const db = await conexao();
  const vendas = await db.collection('sales').find({}).toArray();
  return { sales: vendas };
};

const listarVendaPorID = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const venda = await db.collection('sales').findOne({ _id: ObjectId(id) });
  if (!venda) return false;
  return venda;
};

const criarVenda = async (itensVendidos) => {
  const db = await conexao();
  const venda = await db.collection('sales').insertMany([{ itensSold: itensVendidos }]);
  return { _id: Object.values(venda.insertedIds).toString(), itensSold: itensVendidos };
};

const atualizarVenda = async (id, vendaRealizada) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { vendaRealizada } },
  );
  return { _id: id, itensSold: vendaRealizada };
};

const deletarVenda = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const venda = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  if (!venda) return false;
  return venda.value;
};

module.exports = {
  listarVendas,
  listarVendaPorID,
  criarVenda,
  atualizarVenda,
  deletarVenda,
};