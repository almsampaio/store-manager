const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../models/connection');

const Products = require('../../controllers/Products');
const modelProducts = require('../../models/Products');

const Sales = require('../../controllers/Sales');
const modelSales = require('../../models/Sales');

describe('Testing Products', () => {
  beforeEach(async () => {
    const db = await connection();
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
    const products = [{ name: 'Martelo de Thor', quantity: 10 },
      { name: 'Traje de encolhimento', quantity: 20 },
      { name: 'Escudo do Capitão América', quantity: 30 }];
    await db.collection('products').insertMany(products);
  });
  const response = {};
  const request = {};
  it('Create product', async () => {
    request.body = {
      name: 'Mouse Top',
      quantity: 10,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Products.create(request, response);
    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('Find all products', async () => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Products.findAllProducts(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Find products by ID', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    request.params = {
      id: _id,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Products.findProductById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Update product', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');

    request.body = {
      name: 'Mouse Top',
      quantity: 10,
    };
    request.params = {
      id: _id,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Products.updateProduct(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Delete product', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    request.params = {
      id: _id,
    };
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Products.deleteProduct(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Testing sales', () => {
  beforeEach(async () => {
    const db = await connection();
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
    const products = [{ name: 'Martelo de Thor', quantity: 10 },
      { name: 'Traje de encolhimento', quantity: 20 },
      { name: 'Escudo do Capitão América', quantity: 30 }];
    await db.collection('products').insertMany(products);
  });
  const response = {};
  const request = {};

  it('Create sales', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    request.body = [
      { productId: _id, quantity: 10 },
    ];

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Sales.createSales(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Find all sales', async () => {
    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Sales.getAllSales(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Find sales by ID', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const salesMock = [
      { productId: _id, quantity: 10 },
    ];
    const newSale = await modelSales.createSales(salesMock);
    request.params = { 
      id: newSale._id,
    };

    response.status = sinon.stub()
      .returns(response);
    response.json = sinon.stub()
      .returns();
    await Sales.getSalesById(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});
