const { expect } = require('chai');

const connection = require('../../models/connection');

const Sales = require('../../models/Sales');
const Products = require('../../models/Products');

describe('Products testing',() => {
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
    const productMock = {
      name: 'Ocarina of Time',
      quantity: 10,
    };
    const createdProduct = await Products.create(productMock.name, productMock.quantity);

    const allProducts = await Products.findAllProducts();

    expect(createdProduct).to.be.a('object');
    expect(createdProduct).to.have.a.property('_id');
    expect(allProducts).to.be.a('array');
    expect(allProducts.length).to.be.equal(4);
  });

  it('Find all products', async () => {
    const products = await Products.findAllProducts();
    expect(products).to.be.a('array');
    expect(products.length).to.be.equal(3);
  });

  it('Find product by ID', async () => {
    const { _id } = await Products.findProduct('Martelo de Thor');
    const myProduct = await Products.findProductById(_id);
    expect(myProduct).to.be.a('object');
    expect(myProduct.name).to.be.equal('Martelo de Thor');
    expect(myProduct.quantity).to.be.equal(10);
  });

  it('Update a product', async () => {
    const { _id } = await Products.findProduct('Martelo de Thor');
    const data = { name: 'Cozinha de Thor', quantity: 200 };
    await Products.updateProduct(_id, data);
    const { name, quantity } = await Products.findProductById(_id);
    expect(name).to.be.equal('Cozinha de Thor');
    expect(quantity).to.be.equal(200);
  });

  it('Delete product', async () => {
    const { _id } = await Products.findProduct('Martelo de Thor');
    await Products.deleteProduct(_id);
    const products = await Products.findAllProducts();
    expect(products).to.be.a('array');
    expect(products.length).to.be.equal(2);
    const nullProduct = await Products.findProduct('Martelo de Thor');
    expect(nullProduct).to.be.equal(null);
  });

  it('Find product by name', async () =>{
    const product = await Products.findProduct('Traje de encolhimento');
    expect(product).to.be.a('object');
    expect(product.quantity).to.be.equal(20);
  });
});

describe('Sales testing',() => {
  beforeEach(async () => {
    const db = await connection();
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
  });

  it('Create Sales', async () => {
    const { _id } = await Products.create('IphoneX', 11);
    const salesMock = [
      { productId: _id, quantity: 10 },
    ];
    const newSale = await Sales.createSales(salesMock);
    expect(newSale).to.be.a('object');
    expect(newSale).to.have.a.property('itensSold');
    expect(newSale.itensSold[0].quantity).to.be.equal(10);
  });

  it('Find sale by ID', async () => {
    const { _id } = await Products.create('IphoneX', 11);
    const salesMock = [
      { productId: _id, quantity: 10 },
    ];
    const newSale = await Sales.createSales(salesMock);
    const gottenSale = await Sales.getSalesById(newSale._id);

    expect(gottenSale).to.be.a('object');
    expect(gottenSale).to.have.a.property('itensSold');
    expect(gottenSale.itensSold[0].quantity).to.be.equal(10);
  });
});
