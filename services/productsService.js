const productsModel = require('../models/productsModel');
const { productValidate } = require('../schemas/productsSchema');

const create = async (name, quantity) => {
    const validations = productValidate(name, quantity);

    if (validations.err) return validations;
   
    const product = await productsModel.findByName(name);
     if (product) return { err: { code: 'invalid_data', message: 'Product already exists' } };

    const createdProduct = await productsModel.create(name, quantity);
    return { product: createdProduct };
};

const getById = async (id) => {
    const product = await productsModel.getById(id);

    return product;
};

const remove = async (id) => {
    await productsModel.remove(id);
};

const getAll = async () => {
    const products = await productsModel.getAll();

    return products;
};

const update = async (id, name, quantity) => {
    const validations = productValidate(name, quantity);

    if (validations.err) return validations;

    const product = await productsModel.update(id, name, quantity);
    
    return product;
};

module.exports = {
    create,
    getById,
    remove,
    getAll,
    update,
};
