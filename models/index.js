const findAll = require('./findAllProducts');
const findById = require('./findById');
const findOneProduct = require('./findOneProduct');
const insertOne = require('./insertOne');
const updateById = require('./updateById');

module.exports = {
    findOneProduct,
    insertOne,
    findAll,
    findById,
    updateById,
};
