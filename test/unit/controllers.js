const sinon = require('sinon');
const { expect } = require('chai');

const ProductController = require('../../controllers/ProductController');
const ProductService = require('../../services/ProductService');

// CREATE PRODUCT

describe('Testando a função `create` do controller ProductController', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.body = {
        name: 'Produto Batista',
        quantity: 'string',
      };

      const err = {
        err: { code: 'invalid_data', message: '"quantity" must be a number' }
      }
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'create')
      .resolves(err);
    });

    after(() => {
      ProductService.create.restore();
    });

    it('é chamado o método `status` passando o código 422 como parâmetro', async () => {
      await ProductController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto "err" como parâmetro', async () => {
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

      sinon.stub(ProductService, 'create')
      .resolves({ name: 'Produto Batista',
      quantity: 1 });
    });

    after(() => {
      ProductService.create.restore();
    });

    it('é chamado o método `status` passando o código 201 como parâmetro', async () => {
      await ProductController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o método `json` passando os dados do produto criado como parâmetro', async () => {
      await ProductController.create(request, response);
      const product = { name: 'Produto Batista',
      quantity: 1 };

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});

// getAll Product

describe('Testando a função getAll do controller ProductController', () => {
  describe('quando não existe produtos no banco de dados', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'getAll').returns({ products: [] });
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await ProductController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto como parâmetro', async () => {
      await ProductController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto "products", com um array vazia, como parâmetro', async () => {
      await ProductController.getAll(request, response);

      expect(response.json.calledWith({ products: [] })).to.be.equal(true);
    });

  });

  describe('quando existem produtos no banco de dados', () => {
    const request = {};
    const response = {};
    const products = {
      products: [
        {
          _id: '604cb554311d68f491ba5781',
          name: 'Product Test',
          quantity: 1,
        }
      ]
    };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      sinon.stub(ProductService, 'getAll').resolves(products);
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await ProductController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto como parâmetro', async () => {
      await ProductController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto products como parâmetro, contendo a lista de produtos', async () => {
      await ProductController.getAll(request, response);

      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });
});

// getById Product

describe.only('Testando a função `getById` do service ProductService', () => {

});

