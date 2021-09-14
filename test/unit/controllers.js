const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

const salesController = require('../../controllers/salesController');
const salesService = require('../../services/salesService');

const ERROR_MESSAGE_INVALID_NAME = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be ate least 5 characters long',
  },
}

const ERROR_MESSAGE_INVALID_REPEATED_NAME = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
}

const ERROR_MESSAGE_INVALID_QUANTITY = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
}

const ERROR_MESSAGE_INVALID_QUANTITY_TYPE = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
}

const ERROR_MESSAGE_INVALID_QUANTITY_OF_SALES = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
}





describe('Testes da camada Controller', () => {

  describe('Testando as requisições com a coleção "Procucts"', () => {
    describe('Teste da Requisição POST - Inserindo um novo produto no BD', () => {

      const response = {};
      const request = {};

      describe('Quando é inserido um "name" com menos de 5 caracteres', () => {
        const errorShortName = {
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

          sinon.stub(productsService, 'createProduct').resolves(errorShortName);
        })

        after(async () => {
          productsService.createProduct.restore();
        });


        it('é chamado o status com o código 422', async () => {
          await productsController.createProduct(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('é chamado o json com a mensagem de erro', async () => {
          await productsController.createProduct(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_NAME)).to.be.equal(true);
        });
      });

      describe('Quando é inserido um "name" repetido', () => {


      const errorRepeatedName = {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
        status: 422,
      };

        before(() => {
          request.body = {
            name: "Produto do Batista",
            quantity: 100,
          };

          response.status = sinon.stub()
           .returns(response);
          response.json = sinon.stub()
           .returns();

          sinon.stub(productsService, 'createProduct').resolves(errorRepeatedName);
        })

        after(async () => {
          productsService.createProduct.restore();
        });


        it('é chamado o status com o código 422', async () => {
          await productsController.createProduct(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('é chamado o json com a mensagem de erro', async () => {
          await productsController.createProduct(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_REPEATED_NAME)).to.be.equal(true);
        });
      });

      describe('Quando inserido um quantity menor ou igual a zero', () => {
        const errorInvalidQuantity = {
          err: {
            code: 'invalid_data',
            message: '"quantity" must be larger than or equal to 1',
          },
          status: 422,
        };

        before(() => {
          request.body = {
            name: "Produto do Batista",
            quantity:-1,
          };

          response.status = sinon.stub()
           .returns(response);
          response.json = sinon.stub()
           .returns();

          sinon.stub(productsService, 'createProduct').resolves(errorInvalidQuantity);
        })

        after(async () => {
          productsService.createProduct.restore();
        });


        it('é chamado o status com o código 422', async () => {
          await productsController.createProduct(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('é chamado o json com a mensagem de erro', async () => {
          await productsController.createProduct(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_QUANTITY)).to.be.equal(true);
        });
      });

      describe('Quando inserido um quantity do tipo string', () => {
        const errorInvalidQuantityType = {
          err: {
            code: 'invalid_data',
            message: '"quantity" must be a number',
          },
          status: 422,
        };

        before(() => {
          request.body = {
            name: "Produto do Batista",
            quantity: '2',
          };

          response.status = sinon.stub()
           .returns(response);
          response.json = sinon.stub()
           .returns();

          sinon.stub(productsService, 'createProduct').resolves(errorInvalidQuantityType);
        })

        after(async () => {
          productsService.createProduct.restore();
        });

        it('é chamado o status com o código 422', async () => {
          await productsController.createProduct(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });

        it('é chamado o json com a mensagem de erro', async () => {
          await productsController.createProduct(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_QUANTITY_TYPE)).to.be.equal(true);
        });
      });

    });

  });

  describe('Testando as requisições com a coleção "Sales"', () => {
    describe('Teste da Requisição POST - Inserindo um novo "Sale" no BD', () => {
      const response = {};
      const request = {};

      describe('Será validado que não é possível cadastrar compras com campo quantidade menor que zero', () => {
        const errorInvalidQuantity = {
          err: {
            code: 'invalid_data',
            message:  'Wrong product ID or invalid quantity',
          },
          status: 422,
        };

        before(() => {
          request.body = [
            {
              productId: "5f43ba273200020b101fe49f",
              quantity: 2,
            },
            {
              productId: "5f43ba273233320b101fe45d",
              quantity: -1
            }
          ]

          response.status = sinon.stub()
           .returns(response);
          response.json = sinon.stub()
           .returns();

          sinon.stub(salesService, 'createSale').resolves(errorInvalidQuantity);
        })

        after(async () => {
          salesService.createSale.restore();
        });

        it('é chamado o status com o código 422', async () => {
          await salesController.createSale(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });
        it('é chamado o json com a mensagem de erro', async () => {
          await salesController.createSale(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_QUANTITY_OF_SALES)).to.be.equal(true);
        });

      })

      describe('Será validado que não é possível cadastrar compras com campo quantidade preenchido com string', () => {
        const errorInvalidQuantity = {
          err: {
            code: 'invalid_data',
            message:  'Wrong product ID or invalid quantity',
          },
          status: 422,
        };

        before(() => {
          request.body = [
            {
              productId: "5f43ba273200020b101fe49f",
              quantity: '2',
            },
            {
              productId: "5f43ba273233320b101fe45d",
              quantity: -1
            }
          ]

          response.status = sinon.stub()
           .returns(response);
          response.json = sinon.stub()
           .returns();

          sinon.stub(salesService, 'createSale').resolves(errorInvalidQuantity);
        })

        after(async () => {
          salesService.createSale.restore();
        });

        it('é chamado o status com o código 422', async () => {
          await salesController.createSale(request, response);
          expect(response.status.calledWith(422)).to.be.equal(true);
        });
        it('é chamado o json com a mensagem de erro', async () => {
          await salesController.createSale(request, response);
          expect(response.json.calledWith(ERROR_MESSAGE_INVALID_QUANTITY_OF_SALES)).to.be.equal(true);
        });

      })




    });
  });





});
