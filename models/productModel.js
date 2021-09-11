const connection = require('./connection');

// função para verificar se o produto já existe. seu retorno influenciará na criação de um novo produto, barrando essa criação caso o produto exista.
const findOneProduct = async ({ name }) => {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });

  return result;
};

const create = async ({ name, quantity }) => {
  const alreadyExists = await findOneProduct({ name });
  
  if (alreadyExists) return null;

  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return result.ops[0];
};

module.exports = {
  create,
};
