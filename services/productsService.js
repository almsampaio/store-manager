const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
    const product = songModel.findByName(name);
    if (product) return { message: "Duplicate product"};
    return await productsModel.create(name, quantity);
}

module.exports = {
    create,
}