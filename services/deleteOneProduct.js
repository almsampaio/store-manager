const { deleteOneById } = require('../models');

const deleteOneProduct = async (id) => deleteOneById(id, 'products');

module.exports = deleteOneProduct;