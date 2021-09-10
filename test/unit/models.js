const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');

// const productsModel = require('../../models/movieModel');
const productsModel = {
  create: () => {}
};

const VALIDATION_PRODUCT_INSERT = {
  name: "Produto do Batista",
  quantity: 100
};

describe('Testes da camada Model', () => {

  const DBServer = new MongoMemoryServer();
  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await DBServer.stop();
    MongoClient.connect.restore();
  });

  describe('Testando as requisições com a coleção "/Procucts/"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {


      describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
          const response = await productsModel.create(VALIDATION_PRODUCT_INSERT);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui o "id" do novo filme inserido', async () => {
          const response = await productsModel.create(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('id');
        });
      });
    });
  });
});





