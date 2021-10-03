const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/Products');
const productService = require('../../services/Products');
const saleModel = require('../../models/Sales');
const saleService = require('../../services/Sales');

describe('productService.js', () => {
  const productPayload = {
    _id: '604cb554311d68f491ba5781',
    name: 'product',
    quantity: 10
  };

  describe('when a product is created succesfully', async () => {
    before(() => {
      sinon.stub(productModel, 'create')
        .resolves(productPayload);
    });

    after(() => {
      productModel.create.restore();
      sinon.restore();
    });

    it('returns an object with an "_id" property', async () => {
      const { name, quantity } = productPayload;
      const response = await productService.create(name, quantity);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('when products from DB are requested', async () => {
    before(() => {
      sinon.stub(productModel, 'readAll')
        .resolves([productPayload]);
    });

    after(() => {
      productModel.readAll.restore();
    });

    it('returns an array of objects', async() => {
      const response = await productService.readAll();

      expect(response).to.be.an('array')
      expect(response[0]).to.be.an('object');
    });
  });

  describe('when an id is used to search for a product', async () => {
    before(() => {
      sinon.stub(productModel, 'readById')
        .resolves(productPayload);
    });

    after(() => {
      productModel.readById.restore();
    });

    it('returns an object with an "_id" property', async() => {
      const { _id } = productPayload;
      const response = await productService.readById(_id )

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('when a product property is updated', async () => {
    const updatedProduct = {
      _id: '604cb554311d68f491ba5781',
      name: 'new_name',
      quantity: 10
    };

    before(() => {
      sinon.stub(productModel, 'update')
        .resolves(updatedProduct);
    });

    after(() => {
      productModel.update.restore();
      sinon.restore();
    });

    it('returns an object with updated data', async() => {
      const { name, quantity } = productPayload;
      const product = await productService.create(name, quantity);
      const response = await productService.update(product._id, 'new_name', 10);

      expect(response).to.have.a.property('name', 'new_name');
    });
  });

  describe('when a product is deleted', async() => {
    before(() => {
      sinon.stub(productModel, 'destroy')
        .resolves(productPayload);
    });

    after(() => {
      productModel.destroy.restore();
    });

    it('is removed from DB', async () => {
      const { _id } = productPayload
      const response = await productService.destroy(_id);

      expect(response).to.be.an('object');
    });
  });
});

describe('saleService.js', () => {
  const salePayload = [
    { productId: 'id1', quantity: 10 },
    { productId: 'id2', quantity: 20 }
  ];

  const productPayload = {
    _id: 'id1',
    name: 'product',
    quantity: 10
  };

  describe('when a sale is created succesfully', async () => {
    before(() => {
      sinon.stub(saleModel, 'create')
        .resolves({ _id: '1',itensSold: salePayload });
      sinon.stub(productModel, 'readById')
        .resolves(productPayload);
    });

    after(() => {
      saleModel.create.restore();
      productModel.readById.restore();
      sinon.restore();
    });

    it('returns an object with an "_id" property', async () => {
      const response = await saleService.create(salePayload);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('when sales from DB are requested', async () => {
    before(() => {
      sinon.stub(saleModel, 'readAll')
        .resolves([{ _id: '1',itensSold: salePayload }]);
    });

    after(() => {
      saleModel.readAll.restore();
    });

    it('returns an array of objects', async() => {
      const response = await saleService.readAll();

      expect(response).to.be.an('array')
      expect(response[0]).to.be.an('object');
    });
  });

  describe('when an id is used to search for a sale', async () => {
    before(() => {
      sinon.stub(saleModel, 'readById')
        .resolves({ _id: '1',itensSold: salePayload });
    });

    after(() => {
      saleModel.readById.restore();
    });

    it('returns an object with an "_id" property', async() => {
      const response = await saleService.readById('1');

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('when a sale property is updated', async () => {
    const updatedsale = [
      { productId: 'id1', quantity: 99 },
    ]

    before(() => {
      sinon.stub(saleModel, 'update')
        .resolves({ _id: '1', itensSold: updatedsale });
      sinon.stub(productModel, 'readById')
        .resolves(productPayload);
    });

    after(() => {
      saleModel.update.restore();
      productModel.readById();
      sinon.restore();
    });

    it('returns an object with updated data', async() => {
      const sale = await saleService.create(salePayload);
      const response = await saleService.update(sale._id, updatedsale);

      expect(response.itensSold[0]).to.have.a.property('quantity', 99);
    });
  });

  describe('when a sale is deleted', async() => {
    before(() => {
      sinon.stub(saleModel, 'destroy')
        .resolves({ _id: '1',itensSold: salePayload });
      sinon.stub(productModel, 'readById')
        .resolves(productPayload);
      sinon.stub(productModel, 'update')
        .resolves(productPayload);
    });

    after(() => {
      saleModel.destroy.restore();
      productModel.readById.restore();
      productModel.update.restore();
      sinon.restore();
    });

    it('is removed from DB', async () => {
      const { _id } = salePayload;
      const response = await saleService.destroy(_id);

      expect(response).to.be.an('object');
    });
  });
}); 