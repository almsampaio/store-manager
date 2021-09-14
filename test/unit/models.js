const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductsModel = require('../../models/productsModel');

let connectionMock;

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

/* Restauraremos a função `getConnection` original após os testes. */
after(() => {
  mongoConnection.getConnection.restore();
});

describe('Insere um novo filme no BD', () => {
  describe('quando é inserido com sucesso', () => {
    it('Deve ser uma função', async () => {
      expect(ProductsModel.createProduct).to.be.a('function');
    });

    it('retorna um objeto', async () => {
      const response = await ProductsModel.createProduct("ola", 2);
      expect(response).to.be.a('object')
    });

    it('tal objeto possui a propriedade "name" e "quantity"', async () => {
      const response = await ProductsModel.createProduct("ola", 2);
      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });

  });
});
