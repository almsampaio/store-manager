const sinon = require('sinon');
const { expect } = require('chai');

const Service = require('../../services');
const Controller = require('../../controllers');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_UNPROCESSABLE_STATUS = 422;
const HTTP_NOT_FOUND_STATUS = 404;

const ID_EXAMPLE = '604cb554311d68f491ba5781';
const NOT_VALID_ID = 'I am not valid';

const ERROR_CODE_400 = 'invalid_data';
const ERROR_CODE_401 = 'stock_problem';
const ERROR_CODE_404 = 'not_found';
const ERROR_NAME = { err: {
  code: ERROR_CODE_400,
  message: '"name" length must be at least 5 characters long',
} };
const ERROR_ID = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong id format',
} };
const ERROR_SALES = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong product ID or invalid quantity',
} };
const ERROR_NOT_FOUND = { err: {
  code: ERROR_CODE_404,
  message: 'Sale not found',
} };
const ERROR_SALE_ID = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong sale ID format',
} };
const ERROR_STOCK = { err: {
  code: ERROR_CODE_401,
  message: 'Such amount is not permitted to sell',
} };

// TESTES PRODUCTS

describe('Cadastro de um novo produto', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'addProduct').resolves(ERROR_NAME);
    });

    after(() => {
      Service.products.addProduct.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.addProduct(request, response);

      expect(response.json.calledWith(ERROR_NAME)).to.be.equal(true);
    });
  });

  describe('quando é adicionado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { _id: ID_EXAMPLE, ...request.body };

    before(() => {
      request.body = {
        name: 'Testy, the Tester',
        quantity: 30,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'addProduct').resolves(payload);
    });

    after(() => {
      Service.products.addProduct.restore();
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
  describe('quando não tem nenhum cadastrado',() => {
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

    it('é chamado o método "json" com um array vazio', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const request = {};
    const response = {};

    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      sinon.stub(Service.products, 'getProducts').resolves([payload]);

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

    it('é chamado o método "json" com um array de produtos', async () => {
      await Controller.products.getProducts(request, response);

      expect(response.json.calledWith([payload])).to.be.equal(true);
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {
  describe('quando não encontrado', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: ID_EXAMPLE };

      sinon.stub(Service.products, 'getProductById').resolves(ERROR_ID);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProductById.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.json.calledWith(ERROR_ID)).to.be.equal(true);
    });
  });

  describe('quando encontrado', () => {
    const request = {};
    const response = {};

    const payload = { _id: ID_EXAMPLE, name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      request.params = { id: ID_EXAMPLE };

      sinon.stub(Service.products, 'getProductById').resolves(payload);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    after(() => {
      Service.products.getProductById.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.products.getProductById(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Atualiza as informações de um produto', () => {
  const updatedPayload = { name: 'Testy, the Tester', quantity: 45 };

  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: NOT_VALID_ID };
      request.body = { ...updatedPayload };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'updateProduct').resolves(ERROR_ID);
    });

    after(() => {
      Service.products.updateProduct.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.updateProduct(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.updateProduct(request, response);

      expect(response.json.calledWith(ERROR_ID)).to.be.equal(true);
    });
  });

  describe('quando é encontrado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { _id: ID_EXAMPLE, ...updatedPayload };

    before(() => {
      request.params = { id: ID_EXAMPLE };
      request.body = { ...updatedPayload };

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

    it('é chamado o método "json" com as novas informações do produto', async () => {
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
      request.params = { id: NOT_VALID_ID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.products, 'deleteProduct').resolves(ERROR_ID);
    });

    after(() => {
      Service.products.deleteProduct.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.products.deleteProduct(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.products.deleteProduct(request, response);

      expect(response.json.calledWith(ERROR_ID)).to.be.equal(true);
    });
  });

  describe('quando é deletado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { _id: ID_EXAMPLE, name: 'Testy, the Tester', quantity: 30 };

    before(() => {
      request.params = { id: ID_EXAMPLE };
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

/**  
 * *  * * * TESTES SALES  * * * *
*/

describe('Cadastro de uma nova venda', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'addSales').resolves(ERROR_SALES);
    });

    after(() => {
      Service.sales.addSales.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.sales.addSales(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.addSales(request, response);

      expect(response.json.calledWith(ERROR_SALES)).to.be.equal(true);
    });
  });

  describe('com dados válidos, mas com erro de estoque', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'addSales').resolves(ERROR_STOCK);
    });

    after(() => {
      Service.sales.addSales.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.addSales(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.addSales(request, response);

      expect(response.json.calledWith(ERROR_STOCK)).to.be.equal(true);
    });
  });

  describe('quando é adicionado com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { _id: ID_EXAMPLE, itensSold: request.body };

    before(() => {
      request.body = [{
        productId: ID_EXAMPLE,
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
      await Controller.sales.addSales(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações do produto', async () => {
      await Controller.sales.addSales(request, response);

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

    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before(() => {
      sinon.stub(Service.sales, 'getSales').resolves({
        sales:[{ _id: ID_EXAMPLE, itensSold: payload }]
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
        sales:[{ _id: ID_EXAMPLE, itensSold: payload }]
      })).to.be.equal(true);
    });
  });
});

describe('Carrega uma venda cadastrada pela "_id"', () => {
  describe('quando não encontrada', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: ID_EXAMPLE };

      sinon.stub(Service.sales, 'getSaleById').resolves(ERROR_NOT_FOUND);

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

      expect(response.json.calledWith(ERROR_NOT_FOUND)).to.be.equal(true);
    });
  });

  describe('quando encontrada', () => {
    const request = {};
    const response = {};

    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before(() => {
      request.params = { id: ID_EXAMPLE };

      sinon.stub(Service.sales, 'getSaleById').resolves({ _id: ID_EXAMPLE, itensSold: payload });

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

      expect(response.json.calledWith({ _id: ID_EXAMPLE, itensSold: payload })).to.be.equal(true);
    });
  });
});

describe('Atualiza as informações de uma venda', () => {
  const updatedPayload = [{ productId: ID_EXAMPLE, quantity: 7 }];

  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: NOT_VALID_ID };
      request.body = updatedPayload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'updateSale').resolves(ERROR_SALES);
    });

    after(() => {
      Service.sales.updateSale.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.sales.updateSale(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.updateSale(request, response);

      expect(response.json.calledWith(ERROR_SALES)).to.be.equal(true);
    });
  });

  describe('com dados válidos, mas com erro de estoque', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: ID_EXAMPLE };
      request.body = updatedPayload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'updateSale').resolves(ERROR_STOCK);
    });

    after(() => {
      Service.sales.updateSale.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.updateSale(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.updateSale(request, response);

      expect(response.json.calledWith(ERROR_STOCK)).to.be.equal(true);
    });
  });

  describe('quando é encontrada com sucesso', () => {
    const response = {};
    const request = {};

    const payload = { _id: ID_EXAMPLE, itensSold: updatedPayload };

    before(() => {
      request.params = { id: ID_EXAMPLE };
      request.body = updatedPayload;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'updateSale').resolves(payload);
    });

    after(() => {
      Service.sales.updateSale.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.updateSale(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as novas informações dos produtos vendidos', async () => {
      await Controller.sales.updateSale(request, response);

      expect(response.json.calledWith(payload)).to.be.equal(true);
    });
  });
});

describe('Deleta uma venda cadastrada', () => {
  describe('com dados inválidos', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: NOT_VALID_ID };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'deleteSale').resolves(ERROR_SALE_ID);
    });

    after(() => {
      Service.sales.deleteSale.restore();
    });

    it('é chamado o método "status" com o código 422', async () => {
      await Controller.sales.deleteSale(request, response);

      expect(response.status.calledWith(HTTP_UNPROCESSABLE_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.deleteSale(request, response);

      expect(response.json.calledWith(ERROR_SALE_ID)).to.be.equal(true);
    });
  });

  describe('com dados válidos, mas com erro de estoque', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: ID_EXAMPLE };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'deleteSale').resolves(ERROR_STOCK);
    });

    after(() => {
      Service.sales.deleteSale.restore();
    });

    it('é chamado o método "status" com o código 404', async () => {
      await Controller.sales.deleteSale(request, response);

      expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com a mensagem correspondente', async () => {
      await Controller.sales.deleteSale(request, response);

      expect(response.json.calledWith(ERROR_STOCK)).to.be.equal(true);
    });
  });

  describe('quando é deletada com sucesso', () => {
    const response = {};
    const request = {};

    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before(() => {
      request.params = { id: ID_EXAMPLE };
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(Service.sales, 'deleteSale').resolves({ _id: ID_EXAMPLE, itensSold: payload });
    });

    after(() => {
      Service.sales.deleteSale.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await Controller.sales.deleteSale(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o método "json" com as informações deletadas dos produtos vendidos', async () => {
      await Controller.sales.deleteSale(request, response);

      expect(response.json.calledWith({ _id: ID_EXAMPLE, itensSold: payload })).to.be.equal(true);
    });
  });
});