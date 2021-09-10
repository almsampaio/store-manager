const connection = require('../connection');

const createProductsModel = async (name, qty) => {
    // usando .then só para treino
    connection()
        .then((db) => db.collection('products').insertOne({ name, qty }))
        .then((result) => result.ops);
};

module.exports = createProductsModel;