const { expect } = require('chai');
const connection = require('../../models/connection');

const Products = require('../../services/Products');
const modelProducts = require('../../models/Products');
const Sales = require('../../services/Sales');

describe('Testing products', () => {
  beforeEach(async () => {
    const db = await connection();
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
    const products = [{ name: 'Martelo de Thor', quantity: 10 },
      { name: 'Traje de encolhimento', quantity: 20 },
      { name: 'Escudo do Capitão América', quantity: 30 }];
    await db.collection('products').insertMany(products);
  });

  it('Create product', async () => {
    const product = await Products.create('Mouse', 10);
    expect(product).to.be.a('object');
    expect(product.status).to.be.equal(201);
    expect(product.data).to.be.a('object');
    expect(product.data.name).to.be.equal('Mouse');
  });
  it('If product already exists',  async () => {
    const product = await Products.create('Martelo de Thor', 10);
    expect(product).to.be.a('object');
    expect(product.status).to.be.equal(422);
    expect(product.message).to.be.equal('Product already exists');
  });

  it('Find all products', async () => {
    const products = await Products.findAllProducts();
    expect(products).to.be.a('object');
    expect(products.status).to.be.equal(200);
  });

  it('Find product by ID', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const productById = await Products.findProductById(_id);
    expect(productById).to.be.a('object');
    expect(productById.status).to.be.equal(200);
  });

  it('If id is wrong', async () => {
    const product = await Products.findProductById(10);
    expect(product.status).to.be.equal(422);
  });

  it('Update product', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const data = { name: 'Traje de enchimento', quantity: 200 };
    const newProduct = await Products.updateProduct(_id, data);
    expect(newProduct).to.be.a('object');
    expect(newProduct.status).to.be.equal(200);
  });

  it('Delete product', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const deletedProduct = await Products.deleteProduct(_id);
    expect(deletedProduct).to.be.a('object');
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

  it('Create Sales', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const itensSold = [
      { productId: _id, quantity: 10 },
    ]
    const sales = await Sales.createSales(itensSold);
    expect(sales).to.be.a('object');
  });

  it('Find all sales', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const itensSold = [
      { productId: _id, quantity: 10 },
    ]
    await Sales.createSales(itensSold);
    const allSales = await Sales.getAllSales();
    expect(allSales).to.be.a('object');
  });

  it('Find sale by ID', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const itensSold = [
      { productId: _id, quantity: 10 },
    ]
    await Sales.createSales(itensSold);
    const sale = await Sales.getSalesById(_id);
    expect(sale).to.be.a('object');
  });

  it('Delete sale', async () => {
    const { _id } = await modelProducts.findProduct('Traje de encolhimento');
    const itensSold = [
      { productId: _id, quantity: 10 },
    ]
    await Sales.createSales(itensSold);
    const deletedSale = await Sales.deleteSale(_id);
    expect(deletedSale).to.be.a('object');
  });
});
