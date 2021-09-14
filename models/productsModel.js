const { ObjectId } = require('mongodb');
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

  async function getAllProducts() {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
  
    return products;
  }
  
  async function getByID(id) {
    if (!ObjectId.isValid(id)) return null;
  
    const db = await connection();
    const product = await db.collection('products').findOne(ObjectId(id));
  
    return product;
  }

  const update = async (id, name, quantity) => {
    const db = await connection();
    const product = await db.collection('products').updateOne(
      { _id: ObjectId(id) }, { $set: { name, quantity } },
    );
    console.log(product.message);
    return product;
  };

module.exports = {
    createProduct,
    productExists,
    getAllProducts,
    getByID,
    update,
};
