// Solução encontrada por Victor Moraes - Turma 10-A
const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/products');
const productService = require('../../services/products');
const saleController = require('../../controllers/sales');
const saleService = require('../../services/sales');

describe('productController.js', () => {
  const productPayload = {
    name: 'product_name',
    quantity: 10
  };
  const res = {};
  const req = {};

  describe('when a product is created succesfully', async () => {
    before(() => {
      req.body = productPayload;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'newProduct').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.newProduct.restore();
    });

    it('returns the correct status and message', async () => {
      await productController.newProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    });
  });

  describe('when products from DB are requested', async () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([{ _id: '1', ...productPayload }]);
      sinon.stub(productService, 'getAll').resolves([{ _id: '1', ...productPayload }]);
    });

    after(() => {
      productService.getAll.restore();
    });

    it('returns the correct status and message', async() => {
      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({products: [{ _id: '1', ...productPayload }]})).to.be.equal(true);
    });
  });

  describe('when an id is used to search for a product', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'searchById').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.searchById.restore();
    });

    it('returns the correct status and message', async() => {
      await productController.searchById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    });
  });

  describe('when a product property is updated', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'updateProduct').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.updateProduct.restore();
    });

    it('returns the correct status and message', async() => {
      await productController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    });
  });

  describe('when a product is deleted', async() => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'deleteProduct').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.deleteProduct.restore();
    });
    it('returns the correct status and message', async () => {
      await productController.deleteProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    })
  })
});

describe('saleController.js', () => {
  const salePayload = [
    { productId: 'id1', quantity: 10 },
    { productId: 'id2', quantity: 20 }
  ];
  const res = {};
  const req = {};

  describe('when a sale is created succesfully', async () => {
    before(() => {
      req.body = salePayload;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'inputSales').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.inputSales.restore();
    });

    it('returns the correct status and message', async () => {
      await saleController.inputSales(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    });
  });

  describe('when sales from DB are requested', async () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([{ _id: '1', itensSold: salePayload }]);
      sinon.stub(saleService, 'getAll').resolves([{ _id: '1', itensSold: salePayload }]);
    });

    after(() => {
      saleService.getAll.restore();
    });

    it('returns the correct status and message', async() => {
      await saleController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({sales: [{ _id: '1', itensSold: salePayload }]})).to.be.equal(true);
    });
  });

  describe('when an id is used to search for a sale', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'searchSale').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.searchSale.restore();
    });

    it('returns the correct status and message', async() => {
      await saleController.searchSale(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    });
  });

  describe('when a sale property is updated', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'updateSale').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.updateSale.restore();
    });

    it('returns the correct status and message', async() => {
      await saleController.updateSale(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    });
  });

  describe('when a sale is deleted', async() => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'deleteSale').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.deleteSale.restore();
    });
    it('returns the correct status and message', async () => {
      await saleController.deleteSale(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    })
  })
});
