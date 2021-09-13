const { ObjectId } = require('mongodb');
const connection = require('../connection');

const createProductsModel = async (name, quantity) => {
    const productData = connection()
        .then((db) => db.collection('products').insertOne({ name, quantity }))
        .then((result) => result.ops[0]);

    return productData;
};

const findProductName = async (name) => {
    const db = await connection();
    const productName = await db.collection('products').findOne({ name });
    return productName;
};

const getAllProductsModel = async () => {
    const db = await connection();
    const allProducts = await db.collection('products').find({}).toArray();
    const objProducts = {
        products: allProducts,
    };
    return objProducts;
};

const getProductByIdModel = async (id) => {
    if (!ObjectId.isValid(id)) {
        return 'ID_NOT_EXISTS';
    }
    const db = await connection();
    const productById = await db.collection('products').findOne(new ObjectId(id));
    return productById;
};

const updateProductModel = async (id, name, quantity) => {
    if (!ObjectId.isValid(id)) {
        return 'ID_NOT_EXISTS';
    }

    const db = await connection();
    const getId = await getProductByIdModel(id);
    const updatedProduct = await db.collection('products')
        .updateOne(
            { id: getId.id }, 
            { $set: { name, quantity } },
        );
    return updatedProduct;
};

const deleteProductModel = async (id) => {
    const db = await connection();
    const getId = await getProductByIdModel(id);
    await db.collection('products').deleteOne(getId);
    return getId;    
};

module.exports = { 
    createProductsModel, 
    findProductName,
    getAllProductsModel,
    getProductByIdModel,
    updateProductModel,
    deleteProductModel,
};