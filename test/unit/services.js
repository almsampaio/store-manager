const { expect } = require('chai');
const connection = require('../../connection')
const servicesSales = require('../../services/sales')
const servicesPdt = require('../../services/products')
const modelsProducts = require('../../models/products')

describe('testing services', () => {
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
    const create = await servicesPdt.servicesCreate('productName', 10)
    expect(create.status).to.be.equal(201)
  });

  it('if the product name is the same, return an error', async() => {
    const message = 'Product already exists'
    const create = await servicesPdt.servicesCreate('Traje de encolhimento', 10)
    expect(create.status).to.be.equal(422)
    expect(create.message).to.be.equal(message)
  })

  it('is possible to find all products', async() => {
    const create = await servicesPdt.servicesGetAll()
    expect(create.status).to.be.equal(200)
  });

  it('is possible to find using id', async() => {
    const { info } = await servicesPdt.servicesCreate('productName', 10)
    const id = info._id.toString()
    const product = await servicesPdt.servicesGetById(id)
    expect(product.status).to.be.equal(200)
  })

  it('if the id is incorrect, return an error', async() => {
    const message = 'Wrong id format'
    const product = await servicesPdt.servicesGetById('dsadsas')
    expect(product.status).to.be.equal(422)
    expect(product.message).to.be.equal(message)
  })

  it('is possible to update a product', async() => {
    const { _id } = await servicesPdt.servicesCreate('productName', 10)
    const update = await servicesPdt.servicesUpdate('productName', 1, _id )
    expect(update.status).to.be.equal(200)
  })

  it('is possible to delete a product', async() => {
    const { info } = await servicesPdt.servicesCreate('productName', 10)
    const id = info._id.toString()
    const deleted = await servicesPdt.servicesDelete(id)
    expect(deleted.status).to.be.equal(200)
  })

  it('if the id is incorrect, return an error', async() => {
    const message = 'Wrong id format'
    const deleted = await servicesPdt.servicesDelete('dsadsas')
    expect(deleted.status).to.be.equal(422)
    expect(deleted.message).to.be.equal(message)
  })

  it('is possible to create a sale', async() => {
    const { _id } = await modelsProducts.modelGetByName('Escudo do Capitão América')
    const productId = _id.toString()
    const create = await servicesSales.servicesCreate( [{ productId, quantity: 10}])
    expect(create.status).to.be.equal(200)
  })

  it('if the id is incorrect, return an error', async() => {
    const message = 'Wrong product ID or invalid quantity'
    const create = await servicesSales.servicesCreate( 'saasda', 10)
    expect(create.status).to.be.equal(422)
    expect(create.message).to.be.equal(message)
  })

  it('is possible to find all sales', async() => {
    const allSales = await servicesSales.servicesGetAll()
    expect(allSales.status).to.be.equal(200)
  })

  it('is possible to find a sale by its id', async() => {
    const { _id } = await modelsProducts.modelGetByName('Escudo do Capitão América')
    const productId = _id.toString()
    const { info } = await servicesSales.servicesCreate( [{ productId, quantity: 10}])
    const id = info._id.toString()
    const product = await servicesSales.servicesGetById(id)
    expect(product.status).to.be.equal(200)
  })

  it('if the id is incorrect, return an error', async() => {
    const message = 'Sale not found'
    const product = await servicesSales.servicesGetById('sasada')
    expect(product.status).to.be.equal(404)
    expect(product.message).to.be.equal(message)
  })

  it('is possible to update a sale by its id', async() => {
    const { _id } = await modelsProducts.modelGetByName('Escudo do Capitão América')
    const productId = _id.toString()
    const { info } = await servicesSales.servicesCreate( [{ productId, quantity: 10}])
    const id = info._id.toString()
    const update = await servicesSales.servicesUpdate( [{ productId, quantity: 21 }], id)
    expect(update.status).to.be.equal(200)
  })

  it('if the id is incorrect, return null', async() => {
    const product = await servicesSales.servicesUpdate('sasada')
    expect(product.status).to.be.equal(200)
    expect(product.info).to.be.equal(null)
  })

  it('is possible to delete a sale by its id', async() => {
    const { _id } = await modelsProducts.modelGetByName('Escudo do Capitão América')
    const productId = _id.toString()
    const { info } = await servicesSales.servicesCreate( [{ productId, quantity: 10}])
    const id = info._id.toString()
    const deleted = await servicesSales.servicesDelete( id )
    expect(deleted.status).to.be.equal(200)
  })

})