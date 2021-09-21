const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const connection = require('./connectionMongodb');

const app = express();
app.use(bodyParser.json());

const TABLE_NAME = 'sales'; // Tabela do mongodb

// Retorna todos os produtos da tabela 'products'
const getAll = async () => {
  const db = await connection();
  const products = await db.collection(TABLE_NAME).find({}).toArray();
  return products;
};

// Retorna o produto pelo id
const getById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null; // Verifica se o id é válido segundo os parâmetros do mongodb
  return db.collection(TABLE_NAME).findOne(ObjectId(id));
};

// Retorna o produto pelo id
const getByName = async (wantedName) => {
  const db = await connection();
  const data = await db.collection(TABLE_NAME).findOne({ name: wantedName });
  return data;
};

// Adiciona novos produtos e retorna o produto criado
const create = async (itensSold) => {
  const db = await connection();
  const { insertedIds } = await db.collection(TABLE_NAME)
    .insertMany([{ itensSold }]);
  return {
    _id: insertedIds[0],
    itensSold,
  };
};

// Edita um produto pelo id e retorna o produto editado
const update = async (id, itensSold) => {
  const db = await connection();
  await db.collection(TABLE_NAME)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    );
  return { _id: id, itensSold };
};

// const updateModel = async (id, itensSold) => {
//   if (!ObjectId.isValid(id)) { return null; }
//   const db = await connection();
//   const result = await db.collection('sales').updateOne(
//       { _id: ObjectId(id) }, 
//       { $set: { itensSold } },
//     );
//   return result;
// };

// Remove um produto pelo id
const remove = async (id) => {
  const db = await connection();
  const removedProduct = db.collection(TABLE_NAME).findOne(ObjectId(id));
  await db.collection(TABLE_NAME).deleteOne({ _id: ObjectId(id) });
  return removedProduct;
};

module.exports = { getAll, getById, getByName, create, update, remove };
