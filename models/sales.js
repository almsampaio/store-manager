// Solução enconntrado em parceria com Eduardo Costa - Turma 10-A
const { ObjectId } = require('mongodb');
const connectionDb = require('./connection');

const getAll = async () => {
  const allSales = await connectionDb()
    .then((db) => db.collection('sales').find({}).toArray());
  return allSales;
};

// Solução encontrada por Daniel Ribeiro - Turma 10-A
const updateQuantity = async (salesArray) => {
  const db = await connectionDb();
  const collection = await db.collection('products');
  const updateSalesArray = salesArray.forEach(async (product) => {
    const { quantity, productId } = product;
    const findProduct = await collection.findOne({ _id: ObjectId(productId) });
    const newQuantity = findProduct.quantity - quantity;
    const updateProduct = await collection.findOneAndUpdate(
      { _id: ObjectId(productId) },
      { $set: { quantity: newQuantity } },
    );
    return updateProduct;
  });
  return updateSalesArray;
};

const returnStock = async (salesArray) => {
  const db = connectionDb();
  const collection = db.collection('products');
  const restoreStock = salesArray.forEach(async (product) => {
    const { quantity, productId } = product;
    const findProduct = await collection.findOne({ _id: ObjectId(productId) });
    const newQuantity = findProduct.quantity + quantity;
    const updateProduct = await collection.findOneAndUpdate(
      { _id: ObjectId(productId) },
      { $set: { quantity: newQuantity } },
    );
    return updateProduct;
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
  // console.log(id);
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
