// const { ObjectId } = require('mongodb');
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

// const getsaleByName = async (name) => {
//     const db = await connection();
//     const saleName = await db.collection('sales').findOne({ name });
//     return saleName;
// };

const getAllSalesModel = async () => {
    const db = await connection();
    const allsales = await db.collection('sales').find({}).toArray();
    console.log('allsales', allsales)
    const objsales = { sales: allsales };
    return objsales;
};

// const updatesaleModel = async (id, name, quantity) => {
//     const db = await connection();
//     const getProdutcById = await getsaleByIdModel(id);
//     const { _id } = getProdutcById;
//     const updated = await db.collection('sales')
//         .updateOne({ _id }, { $set: { name, quantity } });
//     return updated;
// };

// const deletesaleModel = async (id) => {
//     const db = await connection();
//     const getId = await getsaleByIdModel(id);
//     await db.collection('sales').deleteOne(getId);
//     return getId;    
// };

module.exports = { 
    createSalesModel, 
    // getsaleByName,
    getAllSalesModel,
    // getSaleByIdModel,
    // updatesaleModel,
    // deletesaleModel,
};