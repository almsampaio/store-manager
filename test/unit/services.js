const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const salesService = require('../../models/salesModel');

const INSERT_PRODUCT_WITH_INVALID_NAME = {
  name: "Pro",
  quantity: 100
};

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

describe('Testes da camada Service', () => {


  before(async () => {

  });

  after(async () => {

  });

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {


      describe('quando é inserido um "name" com menos de 5 caracteres', () => {
        it('retorna um objeto', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_WITH_INVALID_NAME);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro do "name" inválido', async () => {
          const response = await productsService.createProduct(INSERT_PRODUCT_WITH_INVALID_NAME);
          const responseErr = response.err;
          expect(response).to.have.a.property('err');
          expect(responseErr).to.have.a.property('code');
          expect(responseErr).to.have.a.property('message');
        });
      });
    });
  });


});
