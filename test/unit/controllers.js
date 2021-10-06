const sinon = require('sinon');
const { expect } = require('chai');

const Service = require('../../services');
const Controller = require('../../controllers');
const { errorName, errorId, errorSales, 
  errorStock, errorSaleNotFound, errorSaleId } = require('../../utils/objectError');
const { HTTP_UNPROCESSABLE_ENTITY, HTTP_CREATED_STATUS, 
  HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../../httpRequests');


const EXAMPLE_ID = '5f43a7ca92d58904914656b6';
const ID_NOT_VALID = 'I am not valid';

describe('Cadastro de um novo produto', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'productAdditional').resolves(errorName)
    });

    after(() => {
      Service.products.productAdditional.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a messagem correspondente', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.json.calledWith(errorName)).to.be.equal(true);
    });
  });

  describe('quando é adicionado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: EXAMPLE_ID,
      ...request.body,
    }

    before(() => {
      request.body = {
        name: 'Testy, the Tester',
        quantity: 30,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'productAdditional').resolves(payload);
    });

    after(() => {
      Service.products.productAdditional.restore();
    });

    it('é chamado o método "status" com o código 201', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.status.calledWith(HTTP_CREATED_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastro', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(Service.products, 'getProducts').resolves([]);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProducts.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com array vazio', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const request = {};
    const response = {};

    const payload = {
      name: 'Testy, the Tester',
      quantity: 30,
    };

    before(() => {
      sinon.stub(Service.products, 'getProducts').resolves([payload]);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    })

    after(() => {
      Service.products.getProducts.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com um array de produtos', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.json.calledWith([payload])).to.be.equal(true);
    });
  });
});

describe('Carrega um produto cadastro pela "_id"', () => {
  describe('quando não encontrado', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: EXAMPLE_ID};

      sinon.stub(Service.products, 'getProductById').resolves(errorId);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProductById.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a messagem correspondente', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.json.calledWith(errorId)).to.be.equal(true);
    });
  });

  describe('quando encontrado', () => {
    const request = {};
    const response = {};

    const payload = {
      _id: EXAMPLE_ID,
      name: 'Testy, the Tester',
      quantity: 30,
    };

    before(() => {
      request.params = { id: EXAMPLE_ID };

      sinon.stub(Service.products, 'getProductById').resolves(payload);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProductById.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Atualiza as informações de um produto', () => {
  const payloadUpdated = {
    name: 'Testy, the Tester',
    quantity: 45,
  };

  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: ID_NOT_VALID };
      request.body = { ...payloadUpdated };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'updateProduct').resolves(errorId);
    });

    after(() => {
      Service.products.updateProduct.restore();
    });

    it('é chamado o método "satus" com o código 422', async () => {
      await Controller.products.updateProduct(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.updateProduct(request, response);

      expect(response.json.calledWith(errorId)).to.be.equal(true);
    });
  });

  describe('quando é encontrado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = {
      _id: EXAMPLE_ID,
      ...payloadUpdated,
    };

    before(() => {
      request.params = { id: EXAMPLE_ID };
      request.body = { ...payloadUpdated };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'updateProduct').resolves(payload);
    });

    after(() => {
      Service.products.updateProduct.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.updateProduct(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as novas informações do produto', async() => {
      await Controller.products.updateProduct(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Deleta um produto cadastrado', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: ID_NOT_VALID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'deleteProduct').resolves(errorId);
    });

    after(() => {
      Service.products.deleteProduct.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.deleteProduct(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.deleteProduct(request, response);

      expect(response.json.calledWith(errorId)).to.be.equal(true);
    });
  });

  describe('quando é deletado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { 
      _id: EXAMPLE_ID, 
      name: 'Testy, the Tester', 
      quantity: 30, 
    };

    before(() => {
      request.params = { id: EXAMPLE_ID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'deleteProduct').resolves(payload);
    });

    after(() => {
      Service.products.deleteProduct.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.deleteProduct(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações deletadas do produto', async () => {
      await Controller.products.deleteProduct(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Cadastro de uma nova venda', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'addSales').resolves(errorSales);
    });

    after(() => {
      Service.sales.addSales.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.sales.additionalSales(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.additionalSales(request, response);

      expect(response.json.calledWith(errorSales)).to.be.equal(true);
    });
  });

  describe('com dados válidos, mas com erro de estoque', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'addSales').resolves(errorStock);
    });

    after(() => {
      Service.sales.addSales.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.additionalSales(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.additionalSales(request, response);

      expect(response.json.calledWith(errorStock)).to.be.equal(true);
    });
  });

  describe('quando é adicionado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { 
      _id: EXAMPLE_ID, 
      itensSold: request.body,
    };

    before(() => {
      request.body = [{
        productId: EXAMPLE_ID,
        quantity: 3,
      }];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'addSales').resolves(payload);
    });

    after(() => {
      Service.sales.addSales.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.additionalSales(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.sales.additionalSales(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Carrega a lista de vendas', () => {
  describe('quando não tem nenhuma cadastrada',() => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(Service.sales, 'getSales').resolves({ sales: [] });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.sales.getSales.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.getSales(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com um objeto contendo um array vazio', async () => {
      await Controller.sales.getSales(request, response);

      expect(response.json.calledWith({ sales: [] })).to.be.equal(true);
    });
  });

  describe('quando tem vendas cadastradas', () => {
    const request = {};
    const response = {};

    const payload = [{ 
      productId: EXAMPLE_ID,
      quantity: 3,
    }];

    before(() => {
      sinon.stub(Service.sales, 'getSales').resolves({
        sales:[{ 
          _id: EXAMPLE_ID,
          itensSold: payload,
        }]
      });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.sales.getSales.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.getSales(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com um objeto contendo um array de produtos', async () => {
      await Controller.sales.getSales(request, response);

      expect(response.json.calledWith({
        sales:[{ 
          _id: EXAMPLE_ID,
          itensSold: payload,
        }]
      })).to.be.equal(true);
    });
  });
});

describe('Carrega uma venda cadastrada pela "_id"', () => {
  describe('quando não encontrada', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: EXAMPLE_ID };

      sinon.stub(Service.sales, 'getSaleById').resolves(errorSaleNotFound);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.sales.getSaleById.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.getSaleById(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.getSaleById(request, response);

      expect(response.json.calledWith(errorSaleNotFound)).to.be.equal(true);
    });
  });

  describe('quando encontrada', () => {
    const request = {};
    const response = {};

    const payload = [{ 
      productId: EXAMPLE_ID,
      quantity: 3,
    }];

    before(() => {
      request.params = { id: EXAMPLE_ID };

      sinon.stub(Service.sales, 'getSaleById').resolves({ _id: EXAMPLE_ID, itensSold: payload });

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.sales.getSaleById.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.getSaleById(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.sales.getSaleById(request, response);

      expect(response.json.calledWith({ 
        _id: EXAMPLE_ID,
        itensSold: payload,
      })).to.be.equal(true);
    });
  });
});

describe('Atualiza as informações de uma venda', () => {
  const updatedPayload = [{ productId: EXAMPLE_ID, quantity: 7 }];

  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: ID_NOT_VALID };
      request.body = updatedPayload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'updateSale').resolves(errorSales);
    });

    after(() => {
      Service.sales.updateSale.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.sales.saleUpdated(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.saleUpdated(request, response);

      expect(response.json.calledWith(errorSales)).to.be.equal(true);
    });
  });

  describe('com dados válidos, mas com erro de estoque', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: EXAMPLE_ID };
      request.body = updatedPayload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'updateSale').resolves(errorStock);
    });

    after(() => {
      Service.sales.updateSale.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.saleUpdated(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.saleUpdated(request, response);

      expect(response.json.calledWith(errorStock)).to.be.equal(true);
    });
  });

  describe('quando é encontrada com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { _id: EXAMPLE_ID, itensSold: updatedPayload };

    before(() => {
      request.params = { id: EXAMPLE_ID };
      request.body = updatedPayload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'updateSale').resolves(payload);
    });

    after(() => {
      Service.sales.updateSale.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.saleUpdated(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as novas informações dos produtos vendidos', async () => {
      await Controller.sales.saleUpdated(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Deleta uma venda cadastrada', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: ID_NOT_VALID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'deleteSale').resolves(errorSaleId);
    });

    after(() => {
      Service.sales.deleteSale.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.sales.saleDeleted(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_ENTITY)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.saleDeleted(request, response);

      expect(response.json.calledWith(errorSaleId)).to.be.equal(true);
    });
  });

  describe('com dados válidos, mas com erro de estoque', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: EXAMPLE_ID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'deleteSale').resolves(errorStock);
    });

    after(() => {
      Service.sales.deleteSale.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.saleDeleted(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.saleDeleted(request, response);

      expect(response.json.calledWith(errorStock)).to.be.equal(true);
    });
  });

  describe('quando é deletada com sucesso', () => {
    const response = {};
    const request = {};

    const payload = [{
      productId: EXAMPLE_ID,
      quantity: 3,
    }];

    before(() => {
      request.params = { id: EXAMPLE_ID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'deleteSale').resolves({ _id: EXAMPLE_ID, itensSold: payload });
    });

    after(() => {
      Service.sales.deleteSale.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.saleDeleted(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações deletadas dos produtos vendidos', async () => {
      await Controller.sales.saleDeleted(request, response);

      expect(response.json.calledWith({ _id: EXAMPLE_ID, itensSold: payload })).to.be.equal(true);
    });
  });
});