const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((products) => 
       // console.log(products); 
         ({ _id: products.insertedId, name, quantity }));

const getAll = async () => connection()
    .then((db) => db.collection('products').find().toArray())
    .then((products) => 
  //  console.log(products);
   products.map(({ _id, name, quantity }) => 
    ({
        _id,
        name,
        quantity,
    })));

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const product = await connection().then((db) =>
        db.collection('products').findOne({ _id: ObjectId(id) }));
    
    if (!product) return null;

 // console.log(product);
   
    return product;
};

const update = async (id, name, quantity) => {
    if (!ObjectId.isValid(id)) return null;

    const product = await connection().then((db) =>
        db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
    
    if (!product) return null;
    
    return { _id: id, name, quantity };
};

const remove = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const product = await connection().then((db) =>
        db.collection('products').deleteOne({ _id: ObjectId(id) }));

    return product;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};