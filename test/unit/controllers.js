const sinon = require('sinon');
const { expect } = require('chai');

const ProductController = require('../../controllers/ProductController');

describe('Ao chamar o controller de create - controller', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.body = {
        name: 'Produto Batista',
        quantity: 'string',
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

    it('é chamado o status com o código 422', async () => {
      await ProductController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o json com o objeto "err"', async () => {
      await ProductController.create(request, response);
      const err = {
        err: { code: 'invalid_data', message: '"quantity" must be a number' }
      }

      expect(response.json.calledWith(err)).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Produto Batista 2',
        quantity: 1,
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

    it('é chamado o status com o código 201', async () => {
      await ProductController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com os dados do produto criado', async () => {
      await ProductController.create(request, response);
      // console.log(response.json);
      const product = { name: 'Produto Batista',
      quantity: 1 };

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});