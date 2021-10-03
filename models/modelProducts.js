const connection = require('./connection');

const additionProduct = async (dataProduct) => {
  const { name, quantity } = dataProduct;

  const collectionProducts = await connection()
    .then((db) => db.collection('products'));
  
  const { insertdId: _id } = await collectionProducts.insertOne({
    name,
    quantity,
  });

  return {
    _id,
    name,
    quantity,
  };
};

const productByName = async (name) => {
  const collectionProducts = await connection()
    .then((db) => db.collection('products'));
    
    const product = await collectionProducts.findOne({ name });

  return product;
};

const getProducts = async () => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));
  
  const products = await productsCollection.find({}).toArray();

  return products;
};

module.exports = {
  additionProduct,
  productByName,
  getProducts,
};