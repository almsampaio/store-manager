const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const salesService = require('../../models/salesModel');

const VALIDATION_PRODUCT_INSERT_INVALID_NAME = {
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
        const name = VALIDATION_PRODUCT_INSERT_INVALID_NAME.name;
        it('retorna um objeto', async () => {
          const response = await productsService.createProduct(name);
          expect(response).to.be.a('object');
        });
        it('tal objeto possui a mensagem com o erro do "name" inválido', async () => {
          const ERROR_NAME_MESSAGE = {
            err: {
              code: 'invalid_data',
              message: '"name" length must be ate least 5 characters long',
            },
          };

          const response = await productsService.createProduct(name);
          expect(response).to.equals(ERROR_NAME_MESSAGE);
        });
      });
    });
  });

  
});
