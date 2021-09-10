const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');

const ProductModel = {
  create: () => {}
};

// CREATE PRODUCT

describe('Insere um novo produto no BD', () => {
  let connectionMock;

  const payloadProduct = {
    "name": "Produto do Batista",
    "quantity": 100
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(DB_NAME));
  
    sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.connection.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct);

      expect(response).to.be.a('objeto');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await ProductModel.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

    it('deve existir um produto com o nome e a quantidade cadastrada', async () => {
      await ProductModel.create(payloadProduct);

      const movieCreated = await connectionMock.collection('products').findOne({name: payloadProduct.name, quantity: payloadProduct.quantity});

      expect(movieCreated).to.deep.include(payloadProduct);
    });
  });
});