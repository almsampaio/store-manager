const sinon = require('sinon')
const { expect } = require('chai')
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connection = require('../../models/connection')
const ProductModel = require('../../models/Product')

const DB_NAME = 'StoreManager';

describe('Insere um novo produto no BD', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct)

      expect(response).to.be.a('object')
    })

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductModel.create(payloadProduct)

      expect(response).to.have.a.property('id')
    })
  });
});
