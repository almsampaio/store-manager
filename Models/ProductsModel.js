const connection = require('../Connections/MongoDBConnection');

const INTERNAL_SERVER_ERROR = {
  response: {
    err: {
      code: 'Internal_Server_Error',
      message: 'Sorry About that, contact us',
    },
  },
  code: 500,
};

async function insertOneProduct({ name, quantity }) {
  try {
    const db = await connection();
    const productsCollection = db.collection('products');
    const queryResult = await productsCollection.insertOne({ name, quantity });
    return queryResult.ops[0];
  } catch (err) {
    console.log(err);
    return INTERNAL_SERVER_ERROR;
  }
}

async function findOneProduct(nameToFind) {
  try {
    const db = await connection();
    const productsCollection = db.collection('products');
    const queryResult = await productsCollection.findOne({ name: nameToFind });
    return queryResult;
  } catch (err) {
    console.log(err);
    return INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  insertOneProduct,
  findOneProduct,
};
