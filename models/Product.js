// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const zeroIndex = 0;

const create = async (name, quantity) =>
  connection()
    .then((db) =>
      db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[zeroIndex]);

    module.exports = {
      create,
    };

    const findByName = async (name, quantity) => {
      // Determinamos se devemos buscar com ou sem o nome do meio
      const query = { name, quantity };
    
      // Executamos a consulta e retornamos o resultado
      const product = await connection().then((db) =>
        db.collection('products').findOne(query));
    
      // Caso nenhum author seja encontrado, devolvemos null
      if (!product) return null;
    
      return product;
    };

    module.exports = {
      create,
      findByName,
    };