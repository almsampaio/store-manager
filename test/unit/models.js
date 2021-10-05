const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { after, before } = require('mocha');
const getConnection = require('../connectionMock');

const productsModel = require('../../model/productModel');

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

    })
  })
})