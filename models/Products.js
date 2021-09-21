const { ObjectId } = require('mongodb');
const connection = require('../connection');

const create = async (name, quantity) => {
  try {
    const database = await connection();
    const result = await database.collection('products').insertOne({ name, quantity });
    return result.ops[0];
  } catch (e) {
    console.log(`Deu ruim pra criar o produto, erro [${e}]`);
  }
};

const getAll = async () => {
  try {
    const database = await connection();
    const result = await database.collection('products').find().toArray();
    return result;
  } catch (e) {
    console.log(`Não foi possível retornar a lista de produtos, erro [${e}]`);
  }
};

const getByName = async (name) => {
  try {
    const database = await connection();
    const result = await database.collection('products').findOne({ name });
    return result;
  } catch (e) {
    console.log(`Falha ao buscar produto [${name}], erro [${e}]`);
  }
};

const getById = async (id) => {
  try {
    const database = await connection();
    const result = await database.collection('products').findOne(ObjectId(id));
    return result;
  } catch (e) {
    console.log(`Falha ao buscar produto id [${id}], erro [${e}]`);
  }
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
};