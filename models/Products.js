const { ObjectID } = require('mongodb');
const Connection = require('./connection');

// lista de produtos 
const getAll = async () => {
  const db = await Connection();
  const products = await db.collection('products').find().toArray();
  return products;
};
 // busca por id
const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const product = await db.collection('products').findOne({ _id: ObjectID(id) });
 return product;
};

// inclusão do produto 
const create = async (name, quantity) => {
    const db = await Connection();
    const result = await db.collection('products').insertOne({ name, quantity });
    return { _id: result.insertedId, name, quantity };
  };

// filtro pelo nome
const findByName = async (name) => {
  const db = await Connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const updateProduct = async (id, namee, quantityy) => {
  const db = await Connection();
   await db.collection('products')
  .updateOne({ _id: ObjectID(id) }, { $set: { name: namee, quantity: quantityy } });
   const result = await getById(id);
   return result;
};

const deleteProduct = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await Connection();
  const result = await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return result;
};

module.exports = { getAll, getById, create, findByName, updateProduct, deleteProduct };
