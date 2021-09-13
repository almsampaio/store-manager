const conn = require('./conn');
const { createProductModel, getByName } = require('./productModel');

module.exports = { conn, createProductModel, getByName };