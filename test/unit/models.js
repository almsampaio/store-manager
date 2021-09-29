const { expect } = require('chai');
const connection = require('../../connection')
const modelSales = require('../../models/sales')
const modelPdt = require('../../models/products')

describe('testing models', () => {
  beforeEach( async () => {
    const db = await connection()
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
    const products = [{ name: 'Martelo de Thor', quantity: 10 },
    { name: 'Traje de encolhimento', quantity: 20 },
    { name: 'Escudo do Capitão América', quantity: 30 }];
    await db.collection('products').insertMany(products);
  });

  it('is possible to create products', async() => {
    const create = await modelPdt.modelCreate('productName', 10)
    const allProducts = await modelPdt.modelGetAll()

    expect(create).to.have.a.property('_id')
    expect(create).to.be.a('object')
    expect(allProducts).to.be.a('array')
    expect(allProducts.length).to.be.equal(4)
  });

  it('is possible to get all products', async() => {
    const allProducts = await modelPdt.modelGetAll()
    expect(allProducts.length).to.be.equal(3)
    expect(allProducts).to.be.a('array')
  });

  it('is possible to get update a product', async() => {
    const { _id } = await modelPdt.modelGetByName('Martelo de Thor')
    const id = _id.toString()
    const newProduct = { name: 'Escudo do Capitão', quantity: 5, id }
    await modelPdt.modelUpdate(newProduct)
    const updateProduct = await modelPdt.modelGetById(id)
    expect(updateProduct).to.be.a('object')
    expect(updateProduct.name).to.be.equal('Martelo de Thor')
    expect(updateProduct.quantity).to.be.equal(5)
  });

  it('is possible to delete a product', async() => {
    const { _id } = await modelPdt.modelGetByName('Escudo do Capitão América')
    const id = _id.toString()
    await modelPdt.modelDelete(id)
    const allProducts = await modelPdt.modelGetAll()
    const updateProduct = await modelPdt.modelGetById(id)
    expect(updateProduct).to.be.equal(null)
    expect(allProducts.length).to.be.equal(2)
  });

  it('is possible to get a product by name', async() => {
    const product = await modelPdt.modelGetByName('Traje de encolhimento');
    expect(product).to.be.a('object');
    expect(product.quantity).to.be.equal(20);
  });

  it('is possible to create a sale', async() => {
    const { _id } = await modelPdt.modelGetByName('Escudo do Capitão América')
    const idProduct = _id.toString()
    const sale = await modelSales.modelCreate({idProduct, quantity: 10})
    const allSales = await modelSales.modelGetAll()
    expect(allSales.length).to.be.equal(4)
    expect(allSales).to.have.a.property('sales')
    expect(sale).to.have.a.property('itensSold');
  });


  it('is possible to update a sale', async() => {
    const { _id } = await modelPdt.modelGetByName('Escudo do Capitão América')
    const productIdStr = _id.toString()
    const create = await modelSales.modelCreate({ productIdStr, quantity: 10})
    const id = create._id.toString()
    const retorno = await modelSales.modelUpdate(id, {productId, quantity: 1})
    const sale = await modelSales.modelGetById(id)

    expect(retorno.quantity).to.be.equal(1)
    expect(sale.quantity).to.be.equal(1)
  });

  it('is possible to delete a sale', async() => {
    const { _id } = await modelPdt.modelGetByName('Escudo do Capitão América')
    const productId = _id.toString()
    const create = await modelSales.modelCreate({ productId, quantity: 10})
    const id = create._id.toString()
    await modelSales.modelDelete(id)
    const sale = await modelSales.modelGetById(id)

    expect(sale).to.be.equal(null)
  });
  
})

