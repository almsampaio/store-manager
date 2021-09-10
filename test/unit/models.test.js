const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const productModel = require('../../models/productModel');

describe('Insere novo produto no BD', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock; 
  const payloadProduct = {
    name: 'Produto Silva',
    quantity: 10,
  }

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db('model_example'));

    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('É inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await productModel.create(payloadProduct);

      expect(response).to.be.a('object')
    })
    it('O objeto retornado possui o id do produto adicionado', async () => {
      const response = await productModel.create(payloadProduct);

      expect(response).to.have.a.property('id')
    })
    it('deve existir um produto como nome cadastrado', async () => {
      await productModel.create(payloadProduct);
      const createdProduct = await connectionMock.collection('products').findOne({ name: payloadMovie.name });
      expect(createdProduct).to.be.not.null;
    });
  })
})