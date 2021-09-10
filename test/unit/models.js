const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');

const productsModel = require('../../models/productsModel');
const mongoConnection = require('../../models/connection');

const VALIDATION_PRODUCT_INSERT = {
  name: "Produto do Batista",
  quantity: 100
};

describe('Testes da camada Model', () => {


  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then((conn) => conn.db('StoreManager'));
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(async () => {
    mongoConnection.getConnection.restore();
  });

  describe('Testando as requisições com a coleção "/Procucts/"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {


      describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui o "id" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('id');
        });
        it('tal objeto possui o "name" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('name');
        });
        it('tal objeto possui o "quantity" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('quantity');
        });
      });
    });
  });
});





