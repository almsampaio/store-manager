const { ObjectId } = require('mongodb');
const connection = require('./connection');

const updateById = async (id, collectionName, product) => {
    const db = await connection();
    const idQuerie = { _id: new ObjectId(id) };
    const setQuerie = { $set: product };
    return db.collection(collectionName).updateOne(idQuerie, setQuerie);
};

module.exports = updateById;