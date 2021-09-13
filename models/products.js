const getConnection = require('./connection');

const create = async (name, quantity) => 
  getConnection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findByName = async (name) => {
      // Determinamos se devemos buscar com ou sem o nome do meio
    
      // Executamos a consulta e retornamos o resultado
      const product = await getConnection()
        .then((db) => db.collection('products').findOne({ name }));
        console.log(product);
    
      // Caso nenhum author seja encontrado, devolvemos null
      if (!product) return null;
    
      // Caso contrário, retornamos o author encontrado
      return product; // ????
    };
const getAll = async () => {
  const db = await getConnection(); 
  const productsAll = await db.collection('products').find({}).toArray();
  return productsAll;
};

module.exports = {
    create,
    getAll,
    findByName,
};