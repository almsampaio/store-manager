const sinon = require('sinon');
const { expect } = require('chai');

const ProductController = require('../../controllers/ProductController');
const ProductService = require('../../services/ProductService');

// CREATE PRODUCT

describe('Ao chamar o controller de create - controller', () => {
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

      sinon.stub(ProductService, 'create')
      .resolves({ name: 'Produto Batista',
      quantity: 1 });
    });

    it('é chamado o status com o código 201', async () => {
      await ProductController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com os dados do produto criado', async () => {
      await ProductController.create(request, response);
      const product = { name: 'Produto Batista',
      quantity: 1 };

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});

// getAll Product

describe.only('Ao chamar o controller de getAll', () => {
  describe('quando não existe produtos no banco de dados', () => {
    const request = {};
    const response = {};

    before(async () => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductService, 'getAll').returns({ products: [] });
    });

    after(() => {
      ProductService.getAll.restore();
    });

    it('é chamado o método status passando o código 200', async () => {
      await ProductController.getAll(request, response);

      expect(response.status.calledWith(200).to.be.equal(true));
    });

    it('é chamado o json passando o objeto "product" contendo um array', () => {
      await ProductController.getAll(request, response);

      const { products }= response.json;

      expect(products.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o método json passando uma array vazia', () => {
      await ProductController.getAll(request, response);

      const { products }= response.json;

      expect(products.calledWith([])).to.be.equal(true);
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

    it('é chamado o métodos status passando o código 200', async () => {
      await ProductController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json passando o objeto "product" contendo um array', async () => {
      await ProductController.getAll(request, response);

      const { products }= response.json;

      expect(products.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o método json com a lista de produtos', async () => {
      await ProductController.getAll(request, response);

      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });
});