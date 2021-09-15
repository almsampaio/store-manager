const { ObjectId } = require('mongodb');
const connection = require('./connection');

const message = 'Sale not found';

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new Error(message);
  }

  const product = await connection()
  .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!product) throw new Error(message);

  return product;
};

const updateSale = async (req) => {
  const { id } = req.params;
  const [...items] = req.body;

  await connection()
    .then((db) => db.collection('sales').findOneAndUpdate(
      { _id: id },
      { $set: { itensSold: items } },
      { returnDocument: 'after' },
    ).then((result) => result.value));

  const updatedSale = await connection().then((db) => db.collection('sales')
      .findOne({ _id: id }));

    return updatedSale;
};

const getSales = async () => {
  const data = await connection().then((db) => db.collection('sales')
    .find().toArray());
  return data;
};

const deleteSaleModel = async (id) => {
  const errMessage = 'Wrong sale ID format';

  if (!ObjectId.isValid(id)) {
    console.log(id);
    throw new Error(errMessage);
  }

  const deleteItem = await connection()
    .then((db) => db.collection('sales')
      .deleteOne({ _id: new ObjectId(id) }));

    if (!deleteItem) throw new Error(errMessage);

    const sales = await getSales();

    return sales;
};

const addNewSale = async (productsSold) => {
  const data = await connection().then((db) => db.collection('sales'));

  return data.insertOne({ itensSold: productsSold })
    .then((result) => ({ _id: result.insertedId, itensSold: productsSold }));
};

module.exports = {
  addNewSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSaleModel,
};
