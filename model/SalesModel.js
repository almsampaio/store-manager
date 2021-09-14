const { ObjectId } = require('mongodb');
const connection = require('./connection/connection');

const createSalesModel = async (productId, quantity) => {
    const db = await connection();
    const saleData = await db.collection('sales').insertOne({ productId, quantity });
    const result = saleData.ops[0];
    
    const { _id } = result;

    return {
        _id,
        itensSold: [
            productId,
            quantity,
        ],
    };
};

const getSaleByIdModel = async (id) => {
    const objId = ObjectId(id);
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: objId });
    return sale;
};

const getAllSalesModel = async () => {
    const db = await connection();
    const allsales = await db.collection('sales').find({}).toArray();
    const objsales = { sales: allsales };
    return objsales;
};

// const deletesaleModel = async (id) => {
//     const db = await connection();
//     const getId = await getsaleByIdModel(id);
//     await db.collection('sales').deleteOne(getId);
//     return getId;    
// };

module.exports = { 
    createSalesModel, 
    getAllSalesModel,
    getSaleByIdModel,
    // getSaleByIdModel,
    // updatesaleModel,
    // deletesaleModel,
};