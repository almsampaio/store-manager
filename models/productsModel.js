const connection = require('./connectionDB');

const createProduct = async (name, quantity) => {
    const db = await connection();
    const createdProduct = await db.collection('products').insertOne({ name, quantity });
  
    return { _id: createdProduct.insertedId, name, quantity };
  };
  
  const productExists = async (name) => {
    const db = await connection();
    const wasFound = await db.collection('products').findOne({ name });
  
    return wasFound !== null;
  };
module.exports = {
    createProduct,
    productExists,
};
