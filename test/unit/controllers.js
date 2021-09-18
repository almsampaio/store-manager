const sinon = require('sinon');
const { expect } = require('chai');

const ProductController = require('../../controllers/ProductController');
const ProductService = require('../../services/ProductService');

const SalesController = require('../../controllers/SalesController');
const SalesService = require('../../services/SalesService');

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

describe('Testando a função `getById` do controller ProductController', () => {
  describe('quando não existem produtos no banco de dados', () => {
    const request = {};
    const response = {};

    const ProductServicePayload = {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
    }

    before(() => {
      request.params = {
        id: '604cb554311d68f491ba5781'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'getById')
        .resolves(ProductServicePayload);
    });

    after(() => {
      ProductService.getById.restore();
    });

    it('é chamado o método `status` passando 422 com o parâmetro', async () => {
      await ProductController.getById(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto',async () => {
      await ProductController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('o objeto passado como parâmetro para o método `json` possui as keys `message` e `code`',async () => {
      await ProductController.getById(request, response);

      expect(response.json.calledWith(ProductServicePayload)).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', () => {
    const response = {};
    const request = {};

    const ProductServicePayload = {
      _id: '604cb554311d68f491ba5781',
      name: 'Example Product',
      quantity: 1,
    }

    before(() => {
      request.params = {
        id: '604cb554311d68f491ba5781'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(ProductService, 'getById')
        .resolves(ProductServicePayload);
    });

    after(() => {
      ProductService.getById.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await ProductController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto como parâmetro', async () => {
      await ProductController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('o objeto passado como parâmetro para o método json possui as keys _id, name e quantity', async () => {
      await ProductController.getById(request, response);

      expect(response.json.calledWith(ProductServicePayload)).to.be.equal(true);
    });
  });
});

// update Product

describe('Testando a função `update` do controller ProductController', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
  
    before(() => {
      request.body = {
        name: 'Produto Batista',
        quantity: 'string',
      };

      request.params = {
        id: '604cb554311d68f491ba5781'
      };

      const err = {
        err: { code: 'invalid_data', message: '"quantity" must be a number' }
      }
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'update')
      .resolves(err);
    });

    after(() => {
      ProductService.update.restore();
    });

    it('é chamado o método `status` passando o código 422 como parâmetro', async () => {
      await ProductController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto "err" como parâmetro', async () => {
      await ProductController.update(request, response);
      const err = {
        err: { code: 'invalid_data', message: '"quantity" must be a number' }
      }

      expect(response.json.calledWith(err)).to.be.equal(true);
    });
  });

  describe('quando é atualizado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        name: 'Produto Batista 2',
        quantity: 1,
      };

      request.params = {
        id: '604cb554311d68f491ba5781'
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'update')
      .resolves({ name: 'Produto Batista',
      quantity: 1 });
    });

    after(() => {
      ProductService.update.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await ProductController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando os dados do produto atualizado como parâmetro', async () => {
      await ProductController.update(request, response);
      const product = { name: 'Produto Batista',
      quantity: 1 };

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });
});

// remove Product
describe('Testando a função `remove` do controller ProductController', () => {
  describe('quando o produto não é removido', () => {
    const response = {};
    const request = {};

    const errorFormat = {
      err: { 
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    }
  
    before(() => {
      request.params = {
        id: '604cb554311d68f491ba5781'
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'remove')
      .resolves(errorFormat);
    });

    after(() => {
      ProductService.remove.restore();
    });

    it('é chamado o método `status` passando o código 422 como parâmetro', async () => {
      await ProductController.remove(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto `err` como parâmetro', async () => {
      await ProductController.remove(request, response);

      expect(response.json.calledWith(errorFormat)).to.be.equal(true);
    });
  });

  describe('quando o produto é removido', () => {
    const response = {};
    const request = {};

    const productFormat = { 
      _id: '604cb554311d68f491ba5781',
      name: 'Product Example',
      quantity: 10,
    }
  
    before(() => {
      request.params = {
        id: '604cb554311d68f491ba5781'
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(ProductService, 'remove')
      .resolves(productFormat);
    });

    after(() => {
      ProductService.remove.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await ProductController.remove(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando os dados do produto removido como parâmetro', async () => {
      await ProductController.remove(request, response);

      expect(response.json.calledWith(productFormat)).to.be.equal(true);
    });

  });
});

// CREATE SALES

describe('Testando a função `create` do controller SalesController', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    const err = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
    }
  
    before(() => {
      request.body = [{
        productId: '614116aa8ef1e8004d2e3d7a',
        quantity: 'string',
      }];

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'create')
      .resolves(err);
    });

    after(() => {
      SalesService.create.restore();
    });

    it('é chamado o método `status` passando o código 422 como parâmetro', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto "err" como parâmetro', async () => {
      await SalesController.create(request, response);

      expect(response.json.calledWith(err)).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    const ID_EXAMPLE = '814116aa8ef1e8004d2e3d7b';

    const salesPayload = {
      productId: '614116aa8ef1e8004d2e3d7a',
      quantity: 100,
    }

    before(() => {
      request.body = [
        {
          productId: salesPayload.productId,
          quantity: salesPayload.quantity,
        }
      ];
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'create')
      .resolves({
        _id: ID_EXAMPLE,
        itensSold: [
          {
            productId: salesPayload.productId,
            quantity: salesPayload.quantity,
          }
        ]
      });
    });

    after(() => {
      SalesService.create.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando os dados da venda criada como parâmetro', async () => {
      const SALES = { 
        _id: ID_EXAMPLE,
        itensSold: [
          {
            productId: salesPayload.productId,
            quantity: salesPayload.quantity 
          }
        ]};

      await SalesController.create(request, response);
      

      expect(response.json.calledWith(SALES)).to.be.equal(true);
    });
  });
});

// getAll Sales

describe('Testando a função getAll do controller SalesController', () => {
  describe('quando não existe vendas no banco de dados', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, 'getAll').returns({ sales: [] });
    });

    after(() => {
      SalesService.getAll.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto como parâmetro', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto "products", com um array vazia, como parâmetro', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith({ sales: [] })).to.be.equal(true);
    });

  });

  describe('quando existem vendas no banco de dados', () => {
    const request = {};
    const response = {};
    const sales = {
      sales: [
        {
          _id: '604cb554311d68f491ba5781',
          itensSold: [
            { 
              productId: '904cb554311d68f491ba5789',
              quantity: 100,
            }
          ]
        },
      ]
    };

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      sinon.stub(SalesService, 'getAll').resolves(sales);
    });

    after(() => {
      SalesService.getAll.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto como parâmetro', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto vendas como parâmetro, contendo a lista de vendas', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sales)).to.be.equal(true);
    });
  });
});

// getById Sales

describe('Testando a função `getById` do controller SalesController', () => {
  describe('quando não existem vendas no banco de dados', () => {
    const request = {};
    const response = {};

    const SalesServicePayload = {
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    }

    before(() => {
      request.params = {
        id: '604cb554311d68f491ba5781'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'getById')
        .resolves(SalesServicePayload);
    });

    after(() => {
      SalesService.getById.restore();
    });

    it('é chamado o método `status` passando 404 com o parâmetro', async () => {
      await SalesController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto',async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('o objeto passado como parâmetro para o método `json` possui as keys `message` e `code`',async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(SalesServicePayload)).to.be.equal(true);
    });
  });

  describe('quando existem produtos no banco de dados', () => {
    const response = {};
    const request = {};

    const SalesServicePayload = {
      _id: '604cb554311d68f491ba5781',
      itensSold: [
        { 
          productId: '704cb554311d68f491ba5782',
          quantity: 1,
        }
      ]
    }

    before(() => {
      request.params = {
        id: '604cb554311d68f491ba5781'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(SalesService, 'getById')
        .resolves(SalesServicePayload);
    });

    after(() => {
      SalesService.getById.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await SalesController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando um objeto como parâmetro', async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('o objeto passado como parâmetro para o método json possui as keys _id, name e quantity', async () => {
      await SalesController.getById(request, response);

      expect(response.json.calledWith(SalesServicePayload)).to.be.equal(true);
    });
  });
});

// update sale

describe.only('Testando a função `update` do controller SalesController', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    const ERROR = {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }
    }
  
    before(() => {
      request.body = [
        {
          "productId": "5f3ff849d94d4a17da707008",
          "quantity": 3
        }
      ];

      request.params = {
        id: '604cb554311d68f491ba5781'
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'update')
      .resolves(ERROR);
    });

    after(() => {
      SalesService.update.restore();
    });

    it('é chamado o método `status` passando o código 422 como parâmetro', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('é chamado o método `json` passando o objeto "err" como parâmetro', async () => {
      await SalesController.update(request, response);

      expect(response.json.calledWith(ERROR)).to.be.equal(true);
    });
  });

  describe('quando é atualizado com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = [
        {
          "productId": "5f3ff849d94d4a17da707008",
          "quantity": 3
        }
      ];

      request.params = {
        id: '604cb554311d68f491ba5781'
      };
  
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'update')
      .resolves({ 
        _id: '604cb554311d68f491ba5781',
        itensSold: {
          "productId": "5f3ff849d94d4a17da707008",
          "quantity": 3
        }
      });
    });

    after(() => {
      SalesService.update.restore();
    });

    it('é chamado o método `status` passando o código 200 como parâmetro', async () => {
      await SalesController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método `json` passando os dados da venda atualizada como parâmetro', async () => {
      await SalesController.update(request, response);
      const sales = { 
        _id: '604cb554311d68f491ba5781',
        itensSold: {
          "productId": "5f3ff849d94d4a17da707008",
          "quantity": 3
        }
      }

      expect(response.json.calledWith(sales)).to.be.equal(true);
    });
  });
});