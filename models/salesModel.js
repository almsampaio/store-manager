const { ObjectId } = require('mongodb');
const connection = require('./connectionDB');

async function getAllSales() {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();

  return sales;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  return sale;
}

async function create(sales) {
  const db = await connection();
  const createdSales = await db.collection('sales').insertOne({ itensSold: sales });

  return createdSales.ops[0];
}

const updateSale = async (id, sale) => {
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: sale } },
  );
  return { _id: id, itensSold: sale };
};

async function deleteSales(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
}

async function updateInventory(id, quantity) {
  if (!ObjectId.isValid) return null;

  const db = await connection();
  await db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
}

module.exports = {
  getById,
  getAllSales,
  create,
  updateSale,
  deleteSales,
  updateInventory,
};
