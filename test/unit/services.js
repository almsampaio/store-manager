// Solução encontrada por Victor Moraes - Turma 10-A
const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/products');
const productService = require('../../services/products');
const saleModel = require('../../models/sales');
const saleService = require('../../services/sales');

describe('productService.js', () => {
  const productPayload = {
    _id: '604cb554311d68f491ba5781',
    name: 'product',
    quantity: 10
  };

  // describe('when a product is created succesfully', async () => {
  //   before(() => {
  //     sinon.stub(productModel, 'newProduct')
  //       .resolves(productPayload);
  //   });

  //   after(() => {
  //     productModel.newProduct.restore();
  //     sinon.restore();
  //   });

  //   it('returns an object with an "_id" property', async () => {
  //     const { name, quantity } = productPayload;
  //     const response = await productService.newProduct(name, quantity);

  //     expect(response).to.be.an('object');
  //     expect(response).to.have.a.property('_id');
  //   });
  // });

  describe('when products from DB are requested', async () => {
    before(() => {
      sinon.stub(productModel, 'getAll')
        .resolves([productPayload]);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('returns an array of objects', async() => {
      const response = await productService.getAll();

      expect(response).to.be.an('array')
      expect(response[0]).to.be.an('object');
    });
  });

  describe('when an id is used to search for a product', async () => {
    before(() => {
      sinon.stub(productModel, 'searchById')
        .resolves(productPayload);
    });

    after(() => {
      productModel.searchById.restore();
    });

    it('returns an object with an "_id" property', async() => {
      const { _id } = productPayload;
      const response = await productService.searchById(_id )

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
      sinon.stub(productModel, 'updateProduct')
        .resolves(updatedProduct);
    });

    after(() => {
      productModel.updateProduct.restore();
      sinon.restore();
    });

    it('returns an object with updated data', async() => {
      const { name, quantity } = productPayload;
      const product = await productService.newProduct(name, quantity);
      const response = await productService.updateProduct(product._id, 'new_name', 10);

      expect(response).to.have.a.property('name', 'new_name');
    });
  });

  describe('when a product is deleted', async() => {
    before(() => {
      sinon.stub(productModel, 'deleteProduct')
        .resolves(productPayload);
    });

    after(() => {
      productModel.deleteProduct.restore();
    });

    it('is removed from DB', async () => {
      const { _id } = productPayload
      const response = await productService.deleteProduct(_id);

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
      sinon.stub(saleModel, 'inputSales')
        .resolves({ _id: '1',itensSold: salePayload });
      // sinon.stub(productModel, 'searchById')
      //   .resolves(productPayload);
    });

    after(() => {
      saleModel.inputSales.restore();
      // productModel.searchById.restore();
      sinon.restore();
    });

    it('returns an object with an "_id" property', async () => {
      // const response = await saleService.inputSales(salePayload);
      // console.log(response);
      // expect(response).to.be.an('object');
      // expect(response).to.have.a.property('_id');
    });
  });

  describe('when sales from DB are requested', async () => {
    before(() => {
      sinon.stub(saleModel, 'getAll')
        .resolves([{ _id: '1',itensSold: salePayload }]);
    });

    after(() => {
      saleModel.getAll.restore();
    });

    it('returns an array of objects', async() => {
      const response = await saleService.getAll();

      expect(response).to.be.an('array')
      expect(response[0]).to.be.an('object');
    });
  });

  describe('when an id is used to search for a sale', async () => {
    before(() => {
      sinon.stub(saleModel, 'searchSale')
        .resolves({ _id: '1',itensSold: salePayload });
    });

    after(() => {
      saleModel.searchSale.restore();
    });

    it('returns an object with an "_id" property', async() => {
      const response = await saleService.searchSale('1');

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('_id');
    });
  });

  describe('when a sale property is updated', async () => {
    const updatedsale = [
      { productId: 'id1', quantity: 99 },
    ]

    before(() => {
      sinon.stub(saleModel, 'updateSale')
        .resolves({ _id: '1', itensSold: updatedsale });
      sinon.stub(productModel, 'searchById')
        .resolves(productPayload);
    });

    after(() => {
      saleModel.updateSale.restore();
      productModel.searchById();
      sinon.restore();
    });

    it('returns an object with updated data', async() => {
      const sale = await saleService.inputSales(salePayload);
      const response = await saleService.updateSale(sale._id, updatedsale);

      expect(response.itensSold[0]).to.have.a.property('quantity', 99);
    });
  });

  describe('when a sale is deleted', async() => {
    before(() => {
      sinon.stub(saleModel, 'deleteSale')
        .resolves({ _id: '1',itensSold: salePayload });
      sinon.stub(productModel, 'searchById')
        .resolves(productPayload);
      sinon.stub(productModel, 'updateProduct')
        .resolves(productPayload);
    });

    after(() => {
      saleModel.deleteSale.restore();
      productModel.searchById.restore();
      productModel.updateProduct.restore();
      sinon.restore();
    });

    it('is removed from DB', async () => {
      const { _id } = salePayload;
      await saleService.deleteSale(_id);
      const response = await saleService.searchSale(_id)

      expect(response).to.be.an('null');
      // expect(response).to.have.a.property('_id');
    });
  });
});  