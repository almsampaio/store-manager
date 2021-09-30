const { ObjectId } = require('mongodb');
const connection = require('./conection');

const getAll = async () => (
  connection()
  .then((db) => db.collection('products').find().toArray())
  );

const createData = (params) => (
  connection()
    .then((db) => db.collection('products').insertOne(params))
    .then((result) => ({ _id: result.insertedId, ...params }))
);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  return productData;
};

const update = async (id, params) => {
  const updateProduct = await connection()
    .then((db) => db.collection('products')
    .findOneAndUpdate({ _id: new ObjectId(id) }, [{ $set: params }], { returnOriginal: false }));

  return updateProduct.value;
};

module.exports = {
  createData,
  getAll,
  findById,
  update,
};

/* Referências:
  Como filtrar e alterar um objeto no banco de dados: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/#mongodb-method-db.collection.findOneAndUpdate
  Como retornar o documento atualizado no findOneAndUpdate: https://stackoverflow.com/questions/24747189/update-and-return-document-in-mongodb
*/
