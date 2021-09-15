const { ObjectId } = require('mongodb');
const connection = require('./connection/connection');

const createSalesModel = async (item) => {
    const db = await connection();
    const saleData = await db.collection('sales')
        .insertOne({
            itensSold: item,
        });
    
    return saleData.ops[0];
};

const getSaleByIdModel = async (id) => {
    const objId = ObjectId(id);
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: objId });
    return sale;
};

const getAllSalesModel = async () => {
    const db = await connection();
    const sales = await db.collection('sales').find({}).toArray();
    return { sales };
};

const deleteSaleModel = async (id) => {
    const db = await connection();
    const getId = await getSaleByIdModel(id);
    await db.collection('sales').deleteOne(getId);
    return getId;    
};

module.exports = { 
    createSalesModel, 
    getAllSalesModel,
    getSaleByIdModel,
    deleteSaleModel,
};