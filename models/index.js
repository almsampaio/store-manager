const findAll = require('./findAllProducts');
const findById = require('./findById');
const findOneProduct = require('./findOneProduct');
const insertOne = require('./insertOne');

module.exports = {
    findOneProduct,
    insertOne,
    findAll,
    findById,    
};
