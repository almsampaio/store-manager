const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');

const productsModel = require('../../models/productsModel');

before(async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();

  connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db('StoreManager'));


  sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
});

// Restauraremos a função `getConnection` original após os testes.
after(() => {
  mongoConnection.getConnection.restore();
});

describe('adiciona um novo produto', () => {
  let connectionMock;
  const payloadProduct = {
    name: "produto novo",
    quantity: 10,
  }

  it('retorna um objeto', async () => {
    const addedProduct = await productsModel.addProduct(payloadProduct);

    expect(addedProduct).to.be.a('object');
  });
  it('objeto retornado possui propriedade _id', async () => {
    const addedProduct = await productsModel.addProduct(payloadProduct);

    expect(addedProduct).to.have.a.property('_id');
  });
  it('deve existir um produto com o nome cadastrado', async () => {
    const { _id: productId } = await productsModel.addProduct(payloadProduct);

    const productFromDB = await productsModel.getById(productId);
    expect(productFromDB).to.deep.equal({
      _id: productId,
      ...payloadProduct,
    })
  });
});

describe('atualiza um produto', () => {
  let connectionMock;
  const payloadProduct = {
    name: "produto novo",
    quantity: 10,
  }

  it('retorna o produto atualizado', async () => {
    const product = await productsModel.addProduct(payloadProduct);

    const updatedProduct = await productsModel.updateProduct({
      id: product._id,
      name: 'produto mais novo ainda',
      quantity: 15,
    });

    expect(updatedProduct).to.deep.equal({
      _id: product._id,
      name: 'produto mais novo ainda',
      quantity: 15,
    });
  });

  it('o produto atualizado está no BD', async () => {
    const product = await productsModel.addProduct(payloadProduct);

    const updatedProduct = await productsModel.updateProduct({
      id: product._id,
      name: 'produto mais novo ainda',
      quantity: 15,
    });

    const productFromBD = await productsModel.getById(product._id);

    expect(productFromBD).to.deep.equal({
      _id: product._id,
      name: 'produto mais novo ainda',
      quantity: 15,
    });
  });
});
