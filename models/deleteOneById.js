const { ObjectId } = require('mongodb');
const connection = require('./connection');

const deleteOneById = async (id, collectionName) => {
    const db = await connection();
    return db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
};

module.exports = deleteOneById;