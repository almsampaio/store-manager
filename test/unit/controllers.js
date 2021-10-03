const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/Products');
const productService = require('../../services/Products');
const saleController = require('../../controllers/Sales');
const saleService = require('../../services/Sales');

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
      sinon.stub(productService, 'create').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.create.restore();
    });

    it('returns the correct status and message', async () => {
      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    });
  });

  describe('when products from DB are requested', async () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([{ _id: '1', ...productPayload }]);
      sinon.stub(productService, 'readAll').resolves([{ _id: '1', ...productPayload }]);
    });

    after(() => {
      productService.readAll.restore();
    });

    it('returns the correct status and message', async() => {
      await productController.readAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({products: [{ _id: '1', ...productPayload }]})).to.be.equal(true);
    });
  });

  describe('when an id is used to search for a product', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'readById').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.readById.restore();
    });

    it('returns the correct status and message', async() => {
      await productController.readById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    });
  });

  describe('when a product property is updated', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'update').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.update.restore();
    });

    it('returns the correct status and message', async() => {
      await productController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', ...productPayload })).to.be.equal(true);
    });
  });

  describe('when a product is deleted', async() => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', ...productPayload });
      sinon.stub(productService, 'destroy').resolves({ _id: '1', ...productPayload });
    });

    after(() => {
      productService.destroy.restore();
    });
    it('returns the correct status and message', async () => {
      await productController.destroy(req, res);

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
      sinon.stub(saleService, 'create').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.create.restore();
    });

    it('returns the correct status and message', async () => {
      await saleController.create(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    });
  });

  describe('when sales from DB are requested', async () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns([{ _id: '1', itensSold: salePayload }]);
      sinon.stub(saleService, 'readAll').resolves([{ _id: '1', itensSold: salePayload }]);
    });

    after(() => {
      saleService.readAll.restore();
    });

    it('returns the correct status and message', async() => {
      await saleController.readAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({sales: [{ _id: '1', itensSold: salePayload }]})).to.be.equal(true);
    });
  });

  describe('when an id is used to search for a sale', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'readById').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.readById.restore();
    });

    it('returns the correct status and message', async() => {
      await saleController.readById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    });
  });

  describe('when a sale property is updated', async () => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'update').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.update.restore();
    });

    it('returns the correct status and message', async() => {
      await saleController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    });
  });

  describe('when a sale is deleted', async() => {
    before(() => {
      req.params = { id: '1' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns({ _id: '1', itensSold: salePayload });
      sinon.stub(saleService, 'destroy').resolves({ _id: '1', itensSold: salePayload });
    });

    after(() => {
      saleService.destroy.restore();
    });
    it('returns the correct status and message', async () => {
      await saleController.destroy(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ _id: '1', itensSold: salePayload })).to.be.equal(true);
    })
  })
});  