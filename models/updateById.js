const { ObjectId } = require('mongodb');
const connection = require('./connection');

const updateById = async (id, product) => {
    const db = await connection();
    const idQuerie = { _id: new ObjectId(id) };
    const setQuerie = { $set: product };
    return db.collection('products').updateOne(idQuerie, setQuerie);
};

module.exports = updateById;