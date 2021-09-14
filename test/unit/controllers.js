const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsController = require('../../controllers/productController');
const salesService = require('../../services/salesService');
const salesController = require('../../controllers/salesController');


describe('Testando productsController', () => {
  describe('Quando a adição é feita com sucesso', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {
        name: 'Produto teste',
        quantity: 100,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(productsService, 'add').resolves({
        _id: '60e7331efa30b90f51fe8242',
        name: 'Produto teste',
        quantity: 100,
      });
    });

    after(() => {
      productsService.add.restore();
    });

    it('retorna o status HTTP 201', async () => {
      await productsController.add(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('Quando há erro na adição', () => {
    const request = {};
    const response = {};
    let next;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
      next = sinon.stub().returns();

      sinon.stub(productsService, 'add').resolves(null);
    });

    after(() => {
      productsService.add.restore();
    });

    it('quando o nome tem menos que 5 caracteres', async () => {
      request.body = {
        name: 'Prod',
        quantity: 100,
      };

      await productsController.add(request, response, next);

      expect(next.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('quando quantity não é um número', async () => {
      request.body = {
        name: 'Produto',
        quantity: 'string',
      };

      await productsController.add(request, response, next);

      expect(next.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('quando quantity é 0', async () => {
      request.body = {
        name: 'Produto',
        quantity: 0,
      };

      await productsController.add(request, response, next);

      expect(next.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('quando quantity é menor que 0', async () => {
      request.body = {
        name: 'Produto',
        quantity: -1,
      };

      await productsController.add(request, response, next);

      expect(next.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Quando a leitura é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();

      request.body = {
        name: 'Produto teste',
        quantity: 100,
      };

      request.params = {
        id: '60e7e4043399a379cbe0675d',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(productsService, 'getAll').resolves({});
      sinon.stub(productsService, 'getById').resolves({});
    });

    after(() => {
      productsService.getAll.restore();
      productsService.getById.restore();
    });

    it('getAll deve enviar o status HTTP 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('getById deve enviar o status HTTP 200', async () => {
      await productsController.getById(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Quando a leitura não é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();

      request.body = {
        name: 'Produto teste',
        quantity: 100,
      };

      request.params = {
        id: 'invalid_id',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(productsService, 'getAll').resolves({});
      sinon.stub(productsService, 'getById').resolves(null);
    });

    after(() => {
      productsService.getAll.restore();
      productsService.getById.restore();
    });

    it('getById deve chamar o next({})', async () => {
      await productsController.getById(request, response, next);

      expect(next.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });

  describe('Quando a atualização é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();
      request.params = {
        id: '60e7331efa30b90f51fe8242',
      };

      request.body = {
        name: 'Produto teste',
        quantity: 100,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(productsService, 'update').resolves({
        _id: '60e7331efa30b90f51fe8242',
        name: 'Produto teste',
        quantity: 100,
      });
    });

    after(() => {
      productsService.update.restore();
    });

    it('retorna o status HTTP 200', async () => {
      await productsController.update(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Quando a deleção é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();
      request.params = {
        id: '60e7331efa30b90f51fe8242',
      };

      request.body = {
        name: 'Produto teste',
        quantity: 100,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(productsService, 'remove').resolves({
        _id: '60e7331efa30b90f51fe8242',
        name: 'Produto teste',
        quantity: 100,
      });
    });

    after(() => {
      productsService.remove.restore();
    });

    it('retorna o status HTTP 200', async () => {
      await productsController.remove(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Testando salesController', () => {
  describe('Quando a adição é feita com sucesso', () => {
    const next = sinon.stub().returns()
    const request = {};
    const response = {};

    let product;

    before(async () => {
      sinon.stub(salesService, 'add').resolves(true);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      product = await salesController.add({ name: "Teste", quantity: 100 }, response, next)

      request.body = [
        {
          productId: product.id,
          quantity: 10,
        },
      ];

    });

    after(() => {
      salesService.add.restore();
    });

    it('retorna o status HTTP 201', async () => {
      await salesController.add(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true)
    });
  });

  describe('Quando a leitura é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(salesService, 'getAll').resolves({});
      sinon.stub(salesService, 'getById').resolves({});
    });

    after(() => {
      salesService.getAll.restore();
      salesService.getById.restore();
    });

    it('getAll deve enviar o status HTTP 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('getAll deve enviar o status HTTP 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Quando a atualização é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();

      request.body = [
        {
          productId: 10,
          quantity: 5
        }
      ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(salesService, 'update').resolves({
        _id: '60e7331efa30b90f51fe8242',
        itensSold: [
          {
            productId: 10,
            quantity: 5
          }
        ]
      });
    });

    after(() => {
      salesService.update.restore();
    });

    it('retorna o status HTTP 200', async () => {
      await salesController.update(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Quando a deleção é feita com sucesso', () => {
    let next;
    const request = {};
    const response = {};

    before(() => {
      next = sinon.stub().returns();
      request.params = {
        id: '60e7331efa30b90f51fe8242',
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);

      sinon.stub(salesService, 'remove').resolves({
        _id: '60e7331efa30b90f51fe8242',
        name: 'Produto teste',
        quantity: 100,
      });
    });

    after(() => {
      salesService.remove.restore();
    });

    it('retorna o status HTTP 200', async () => {
      await salesController.remove(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});