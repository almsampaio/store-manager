const { ObjectID, ObjectId } = require('mongodb');
const connect = require('./connection');

const CreateProduct = async (name, quantity) => {
    const product = await connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
    return {
      _id: product.insertedId,
      name,
      quantity,
    };
  };

const findProducts = async (name) => connect()
      .then((db) => db.collection('products').findOne({ name }));

const productsAll = async () => connect()
      .then((db) => db.collection('products').find().toArray());
    
const idProducts = async (id) => {
    const result = await connect();
        if (!ObjectId.isValid(id)) return null;
        return result.collection('products').find({ _id: ObjectID(id) }).toArray();
    };

module.exports = {
    CreateProduct,
    findProducts,
    productsAll,
    idProducts,
};