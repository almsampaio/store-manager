const connection = require('./connection');

const addSales = async (itensSold) => {
    const db = await connection();
    const result = await db.collection('sales').insertOne({ itensSold });
    return { _id: result.insertedId, itensSold };
};

const getBySale = async (itensSold) => {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ itensSold });
    return sale;
};

module.exports = { addSales, getBySale };
