const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');

const mongoConnection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const VALIDATION_PRODUCT_INSERT = {
  name: "Produto do Batista",
  quantity: 100
};


const VALIDATION_SALE_INSERT = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: 2
  }
]

const VALIDATION_SALE_INSERT_WHIT_TWO_PRODUCTS = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: 2
  },
  {
    productId: "5f43ba273212220b101fr46g",
    quantity: 7
  }
]



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

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {


      describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui o "_id" do novo produto inserido', async () => {
          const response = await productsModel.createProduct(VALIDATION_PRODUCT_INSERT);
          expect(response).to.have.a.property('_id');
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

  describe('Testando as requisições com a coleção "Sales"', () => {
    describe('Teste da Requisição POST - Inserindo uma nova venda no BD', () => {


      describe('quando é inserido com sucesso', () => {
        it('retorna um objeto', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT_WHIT_TWO_PRODUCTS);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui um "_id" da venda inserida', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          expect(response).to.have.a.property('_id');
        });
        it('tal objeto possui a propriedade "itensSold" que é um array', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          expect(response).to.have.a.property('itensSold');
        });
        it('"itensSold" possui possui a propriedade "productId"', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          const respItensSold = response.itensSold[0];
          expect(respItensSold).to.have.a.property('productId');
        });
        it('"itensSold" possui possui a propriedade "quantity"', async () => {
          const response = await salesModel.createSale(VALIDATION_SALE_INSERT);
          const respItensSold = response.itensSold[0];
          expect(respItensSold).to.have.a.property('quantity');
        });
      });
    });
  });
});





