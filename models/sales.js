// const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const createSales = async (itensSold) => 
  getConnection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));
   
    /* const getAll = async () => {
    const db = await getConnection(); 
    const salesAll = await db.collection('sales').find({}).toArray();
    return salesAll; 
  }; */

/* const getById = async (id) => {
  const idSize = 24;
  if (id.length < idSize) return null;
  const db = await getConnection(); 
  // fonte: https:qastack.com.br/programming/8233014/how-do-i-search-for-an-object-by-its-objectid-in-the-mongo-console
  const productsId = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (!productsId) return null;
  return productsId;
};
const productUpdate = async (id, name, quantity) => {
  const db = await getConnection(); 
  const updatedProduct = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) }, 
    { $set: 
      { name, quantity },
    },
    { returnDocument: 'after' },
  );
  return updatedProduct.value;
};

const productDelete = async (id) => {
  const db = await getConnection();
  const isDelete = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (isDelete) {
    const deletedProduct = await db.collection('products').deleteOne(
      { _id: ObjectId(id) }, 
    );
    if (deletedProduct !== isDelete) return isDelete;
  }
}; */

module.exports = {
    createSales,
    /* getAll,
    getById,
    productUpdate,
    productDelete, */
};