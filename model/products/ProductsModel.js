const { ObjectId } = require('mongodb');
const connection = require('../connection');

const createProductsModel = async (name, quantity) => {
    const db = await connection();
    const productData = await db.collection('products').insertOne({ name, quantity });
    return productData.ops[0];
};

const getProductByName = async (name) => {
    const db = await connection();
    const productName = await db.collection('products').findOne({ name });
    return productName;
};

const getAllProductsModel = async () => {
    const db = await connection();
    const allProducts = await db.collection('products').find({}).toArray();
    const objProducts = { products: allProducts };
    return objProducts;
};

const getProductByIdModel = async (id) => {
    const db = await connection();
    const productById = await db.collection('products').findOne(new ObjectId(id));
    return productById;
};

const updateProductModel = async (id, name, quantity) => {
    const db = await connection();
    const getProdutcById = await getProductByIdModel(id);
    const { _id } = getProdutcById;
    const updated = await db.collection('products')
        .updateOne({ _id }, { $set: { name, quantity } });
    return updated;
};

const deleteProductModel = async (id) => {
    const db = await connection();
    const getId = await getProductByIdModel(id);
    await db.collection('products').deleteOne(getId);
    return getId;    
};

module.exports = { 
    createProductsModel, 
    getProductByName,
    getAllProductsModel,
    getProductByIdModel,
    updateProductModel,
    deleteProductModel,
};