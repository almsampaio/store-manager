const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
    // const products = await connect().then((db) => db.collection('products').find().toArray());
    // return products;
    const db = await connect();
    const products = await db.collection('products').find().toArray();
    return products;
};

const getById = async (id) => {
    console.log('ID - MODELO - GETBYID', id);
    if (!ObjectId.isValid(id)) return false;
    const product = await connect()
      .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
      console.log('getByID ---- MODEL', product);
      if (!product) return false;
      return product;
};

const findByName = async (name) => {
    const product = await connect()
      .then((db) => db.collection('products').findOne({ name }));
    if (!product) return null;
    return product;  
};

const create = async (name, quantity) => {
    const db = await connect();
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
};

const updateById = async (name, quantity, id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connect();
    const updatedData = await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { name, quantity });
    return updatedData;
};

const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connect();
    const result = await db.collection('products').deleteOne({ _id: ObjectId(id) });
    return { _id: result.insertId, name: result.name, quantity: result.quantity };
};

module.exports = { 
    create,
    findByName,
    getAll,
    getById,
    updateById,
    remove,
};