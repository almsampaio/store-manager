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

const getByName = async (name) => {
  try {
    const database = await connection();
    const result = await database.collection('products').findOne({ name });
    return result;
  } catch (e) {
    console.log(`Erro ao buscar produto [${name}]`);
  }
};

module.exports = {
  create,
  getByName,
};