const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createNewProduct = async (name, quantity) => {
    const db = await connection.mongoDB();
    const { insertedId } = await db.collection('products').insertOne({ name, quantity });
     return { _id: insertedId, name, quantity };
};

const searchProductByName = async (name) => {
    const db = await connection.mongoDB();
    const searchProduct = await db.collection('products').find({ name }).toArray();
    return searchProduct;
};

const getAllProducts = async () => {
    const db = await connection.mongoDB();
    const products = await db.collection('products').find().toArray();
    return products;
};

const getById = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection.mongoDB();
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
};

const updateProductById = async (id, name, quantity) => {
    const db = await connection.mongoDB();
    const updateProduct = await db.collection('products')
    .findOneAndUpdate({ _id: ObjectId(id) },
     { $set: { name, quantity } }, { returnDocument: 'after' });
      return updateProduct.value;
};

const deleteProductByID = async (id) => {
    const db = await connection.mongoDB();
    await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

const updateProductByQuantityAddSale = async (id, saleQuantity) => {
    const db = await connection.mongoDB();
     await db.collection('products')
    .updateMany({ _id: ObjectId(id) }, { $inc: { quantity: -saleQuantity } });
};

const updateProductByQuantityRemoveSale = async (id, saleQuantity) => {
    const db = await connection.mongoDB();
     await db.collection('products')
    .updateMany({ _id: ObjectId(id) }, { $inc: { quantity: saleQuantity } });
};

module.exports = { 
    createNewProduct,
     searchProductByName, 
     getAllProducts, 
     getById,
     updateProductById,
     deleteProductByID,
     updateProductByQuantityAddSale,
     updateProductByQuantityRemoveSale,
    };