const productModel = require('../models/products');

const addProduct = async (name, quantity) => {
    const find = await productModel.findName(name);
    const message = 'Product already exists';
    
    if (find) return { status: 422, message };
    const product = await productModel.addProduct(name, quantity);
    return { status: 201, data: product };
};
const getAll = async () => {
    const products = await productModel.getAll();
    return { status: 200, data: products };
};

const getById = async (id) => {
    const product = await productModel.getById(id);
    const message = 'Wrong id format';

    if (!product) return { status: 422, message };
    return { status: 200, data: product };
};

const update = async (id, data) => {
    const product = await productModel.update(id, data);
    return { status: 200, data: product };
};

const remove = async (id) => {
    const product = await productModel.getById(id);
    const message = 'Wrong id format';

    if (!product) return { status: 422, message };
    const result = await productModel.remove(id);
    return { status: 200, data: result };
};

module.exports = { addProduct, getAll, getById, update, remove };
