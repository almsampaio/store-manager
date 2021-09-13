const connection = require('./connection');

const createNewSales = async (...itensSold) => {
    const db = await connection.mongoDB();
    const { insertedId } = await db.collection('sales').insertOne({ itensSold });
    return { _id: insertedId, itensSold };
};

const getAll = async () => {
    const db = await connection.mongoDB();
    const sales = await db.collection('sales').find().toArray();
    return sales;
};

module.exports = {
    createNewSales,
    getAll,
};