// Solução enconntrado em parceria com Eduardo Costa - Turma 10-A
const { ObjectId } = require('mongodb');
const connectionDb = require('./connection');
const modelProduct = require('./products');

const getAll = async () => {
  const allSales = await connectionDb()
    .then((db) => db.collection('sales').find({}).toArray());
  return allSales;
};

// Solução encontrada por Daniel Ribeiro - Turma 10-A
const updateQuantity = async (salesArray) => {
  const db = await connectionDb();
  
  const updateSalesArray = salesArray.map(async (product) => {
    const { quantity, productId } = product;

    const findProduct = await modelProduct.searchById(productId);
    
    const newQuantity = findProduct.quantity - quantity;
    if (newQuantity) {
      const updateProduct = await db.collection('products').findOneAndUpdate(
        { _id: ObjectId(productId) },
        { $set: { quantity: newQuantity } },
      );
      return updateProduct.value;
    }
  });
  return updateSalesArray;
};

const returnStock = async (id) => {
  const db = await connectionDb();
  const findSale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  const { itensSold } = findSale;
  const restoreStock = itensSold.map(async (product) => {
    const { quantity, productId } = product;
    const findProduct = await db.collection('products').findOne({ _id: ObjectId(productId) });
    const newQuantity = findProduct.quantity + quantity;
    const updateProduct = await db.collection('products').findOneAndUpdate(
      { _id: ObjectId(productId) },
      { $set: { quantity: newQuantity } },
    );
    return updateProduct.value;
  });
  return restoreStock;
};

const inputSales = async (salesArray) => {
  const { ops: newSale } = await connectionDb()
    .then((db) => db.collection('sales')
      .insertOne(
        {
          itensSold: salesArray,
        },
      ));
  return newSale[0];
  // const db = await connectionDb();
  // const collection = await db.collection('sales');
  // const newSale = await collection
  //     .insertOne(
  //       {
  //         itensSold: salesArray,
  //       },
  //     );
  // // console.log(newSale);
  // return newSale;
};

// Solução encontrada por Daniel Ribeiro - Turma 10-A
const searchSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connectionDb();
  const sale = await db.collection('sales')
    .findOne({ _id: ObjectId(id) }); 
  if (!sale) return null;
  return sale;
};

const updateSale = async (id, itensSold) => {
  const updateSaleId = await connectionDb();
  await updateSaleId.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    );
  return { _id: id, itensSold };
};

const deleteSale = async (id) => {
  const db = await connectionDb();
  const salesCollection = db.collection('sales');
  if (ObjectId.isValid(id)) {
    const delSale = await salesCollection.findOne({ _id: ObjectId(id) });
    await salesCollection.deleteOne({ _id: ObjectId(id) });
    return delSale;
  }
};

module.exports = {
  getAll,
  inputSales,
  searchSale,
  updateSale,
  deleteSale,
  updateQuantity,
  returnStock,
};
