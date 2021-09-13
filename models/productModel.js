const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collectionName = 'products';

const findByName = async (name) => {
    const db = await getConnection(); 
    const song = await db.collection(collectionName).findOne({ name });

    return song;
};

const register = async (name, quantity) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName).insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
  };

const getAllProducts = async () => {
    const db = await getConnection(); 
    const products = await db.collection(collectionName).find({}).toArray();
    return products;
  };
  const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
  
    const db = await getConnection(); 
    const product = await db.collection(collectionName).findOne({ _id: ObjectId(id) });
    return product;
  };

const update = async (id, name, quantity) => {
    if (!ObjectId.isValid(id)) return null;

    const db = await getConnection();
    await db.collection(collectionName)
        .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return { id, name, quantity };
};
const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection();
  await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
    findByName,
    register,
    getAllProducts,
    getById,
    update,
    remove,
  
  }; 