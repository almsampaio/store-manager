const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');

const salesService = require('../../models/salesModel');

const INSERT_PRODUCT_WITH_INVALID_NAME = {
  name: "Pro",
  quantity: 100,
};

const INSERT_PRODUCT_QUANTITY_EQUAL_ZERO = {
  name: "Produto do Batista",
  quantity: 0,
};

const INSERT_PRODUCT_QUANTITY_SUB_ZERO = {
  name: "Produto do Batista",
  quantity: -1,
};

const INSERT_PRODUCT_OK = {
  name: "Produto do Batista",
  quantity: 100
};

const VALIDATION_SALE_INSERT = [
  {
    productId: "5f43ba273200020b101fe49f",
    quantity: 2
  }
]

describe('Testes da camada Service', () => {

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {


      describe('quando é inserido um "name" com menos de 5 caracteres', () => {
        it('retorna um objeto', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_WITH_INVALID_NAME);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro de "name" inválido', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_WITH_INVALID_NAME);
          const responseErr = response.err;
          expect(response).to.have.a.property('err');
          expect(responseErr).to.have.a.property('code');
          expect(responseErr).to.have.a.property('message');
        });
      });

      before(async () => {
        const productAlreadyExists = [{
          _id: "f43ba273200020b101fe49f",
          name: "Produto do Batista",
          quantity: 334
        }];

        sinon.stub(productsModel, 'getAllProdutcts').resolves(productAlreadyExists);
      });

      after(async () => {
        productsModel.getAllProdutcts.restore();
      });
      describe('Verifica que não é possível criar um produto com um "name" ja existente', () => {

        it('Quando inserido um nome ja existente, retorna um objeto', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_OK);

          expect(response).to.be.a('object');
        });
        it('tal objeto possui um objeto json com a mensagem com o erro de "name" inválido', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_OK);
          const responseErr = response.err;
          expect(response).to.have.a.property('err');
          expect(responseErr).to.have.a.property('code');
          expect(responseErr).to.have.a.property('message');
        });
      });

      describe('quando é inserido um "quantity" menor ou igual a zero', () => {

        it('retorna um objeto', async () => {
          const responseToZero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_EQUAL_ZERO);
          expect(responseToZero ).to.be.a('object');
          const responseToSubzero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_SUB_ZERO);
          expect(responseToSubzero).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro de "quantity" inválido', async () => {
          const responseToZero  = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_EQUAL_ZERO);
          const responseToZeroErr = responseToZero.err;
          expect(responseToZero).to.have.a.property('err');
          expect(responseToZeroErr).to.have.a.property('code');
          expect(responseToZeroErr).to.have.a.property('message');

          const responseToSubzero = await productsService.createProduct(INSERT_PRODUCT_QUANTITY_SUB_ZERO);
          const responseToSubzeroErr = responseToSubzero.err;
          expect(responseToSubzero).to.have.a.property('err');
          expect(responseToSubzeroErr).to.have.a.property('code');
          expect(responseToSubzeroErr).to.have.a.property('message');
        });
      });




    });
  });


});
