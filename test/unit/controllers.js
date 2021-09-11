const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

const salesController = require('../../controllers/sales.Controller');
const salesService = require('../../services/salesService');

const ERROR_MESSAGE_INVALID_NAME = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be ate least 5 characters long',
  },
}


describe('Testes da camada Controller', () => {

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {

      const response = {};
      const request = {};
      const error = {
        err: {
          code: 'invalid_data',
          message: '"name" length must be ate least 5 characters long',
        },
        status: 422,
      };

      before(() => {
        request.body = {
          name: "Pro",
          quantity: 100,
        };

        response.status = sinon.stub()
         .returns(response);
        response.json = sinon.stub()
         .returns();

        sinon.stub(productsService, 'createProduct').resolves(error);
      })

      describe('quando é inserido um "name" com menos de 5 caracteres', () => {
        it('é chamado o status com o código 400', async () => {
          await productsController.createProduct(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('é chamado o json com a mensagem de erro', async () => {
          await productsController.createProduct(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_NAME)).to.be.equal(true);
        });

      });
    });

  });









  describe('Testando as requisições com a coleção "Sales"', () => {
    describe('Teste da Requisição POST - Inserindo um novo "Sale" no BD', () => {

    });
  });






});
