const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { after, before } = require('mocha');
const getConnection = require('../connectionMock');

const productsModel = require('../../models/productModel');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

payloadProduct = {
  name: 'camisa do flamengo',
  quantity: 100
}

describe('Products Model Testing', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await connectionMock.db('StoreManager'). collection('products').deleteMany({});
  });

  describe('Criação de um novo produto', () => {
    describe('Inserção de produto no BD com sucesso', () => {
      let response;
      
      before(async () => {
        response = await productsModel.createProduct(payloadProduct);
      });
      
      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      it('Retorna um objeto', () => {
        expect(response).to.be.a('object');
      });

      it('O Produto possui as chaves _id, name e quantity', () => {
        expect(response).to.include.keys('_id', 'name', 'quantity');
      });

      it('A propriedade quantity deve ser um número maior que 0', () => {
        const { quantity } = response;
        expect(quantity).to.be.a('number');
        expect(quantity).to.be.greaterThan(0);
      });

      it('name deve ser uma string com mais de 5 caracteres', () => {
        const { name } = response;
        expect(name).to.be.a('string');
        expect(name.length).to.be.greaterThanOrEqual(5);
      })
      it('name é requerido', () => {
        const { name } = response;
        expect(name).to.be.exist;
      })
      it('quantity é requerido', () => {
        const { quantity } = response;
        expect(quantity).to.be.exist;
      });
    });
  });
});

describe('Sales Model Testing', () => {
  let connectionMock;
  let existentProduct;

  before(async () => {
    connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    
    existentProduct = await productsModel.createProduct(payloadProduct);
  });

  after(async () => {
    MongoClient.connect.restore();
    await connectionMock.db('StoreManager').collection('sales').deleteMany({});
  });

  describe('Manipulação de vendas', () => {
    it('Deve retornar um objeto', async () => {
      const createSale = await salesModel.createSales([{
        productId: existentProduct._id,
        quantity: 10
      }])
    })

    it('O Produto possui as chaves _id, itensSold', async () => {
      const insertedSale = await salesModel.createSales([{ productId: existentProduct._id, quantity: 10 }]);
      expect(insertedSale).to.include.all.keys('_id', 'itensSold');
    });

    it('Deletar venda', async () => {
      const addProduct = await productsModel.createProduct(payloadProduct);
      const addSale = await salesModel.createSales([{
        productId: addProduct._id,
        quantity: 5
      }])
      await salesModel.remove(addSale._id);
      const saleFromDB = await salesService.getSalesById(addSale._id);
      expect(saleFromDB).to.be.false;
    })
  })
})