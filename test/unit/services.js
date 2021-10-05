const { expect } = require('chai');
const connection = require('../../models/connection')
const salesService = require('../../service/Sales')
const serviceProducts = require('../../service/Products')
const productsModel = require('../../models/Products')

describe('testando a camada service', () => {
  beforeEach( async () => {
    const db = await connection()
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
    const products = [{ name: 'Martelo de Thor', quantity: 10 },
    { name: 'Traje de encolhimento', quantity: 20 },
    { name: 'Escudo do Capitão América', quantity: 30 }];
    await db.collection('products').insertMany(products);
  });

  it('é possivel criar um produto', async() => {
    const create = await serviceProducts.create('productName', 10)
    expect(create.status).to.be.equal(201)
  });

  it('Caso o produto já exita, retorne um erro', async() => {
    const message = 'Product already exists'
    const create = await serviceProducts.create('Traje de encolhimento', 10)
    expect(create.status).to.be.equal(422)
    expect(create.message).to.be.equal(message)
  })

  it('é possivel listar todos os produtos', async() => {
    const create = await serviceProducts.getAll()
    expect(create.status).to.be.equal(200)
  });

  it('é possivel filtrat por id', async() => {
    const { info } = await serviceProducts.create('productName', 10)
    const id = info._id.toString()
    const product = await serviceProducts.getById(id)
    expect(product.status).to.be.equal(200)
  })

  it('se o id estiver incorreto retorne um erro', async() => {
    const message = 'Wrong id format'
    const product = await serviceProducts.getById('dsadsas')
    expect(product.status).to.be.equal(422)
    expect(product.message).to.be.equal(message)
  })

  it('é possivel atualizar um produto', async() => {
    const { _id } = await serviceProducts.create('productName', 10)
    const update = await serviceProducts.updateProduct('productName', 1, _id )
    expect(update.status).to.be.equal(200)
  })

  it('is possivel deletar um produto', async() => {
    const { info } = await serviceProducts.create('productName', 10)
    const id = info._id.toString()
    const deleted = await serviceProducts.deleteProduct(id)
    expect(deleted.status).to.be.equal(200)
  })

  it('caso o id esteja incorreto retorne um erro', async() => {
    const message = 'Wrong id format'
    const deleted = await serviceProducts.deleteProduct('dsadsas')
    expect(deleted.status).to.be.equal(422)
    expect(deleted.message).to.be.equal(message)
  })

  it('é possivel criar uma venda', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const productId = _id.toString()
    const create = await servicesSales.createSales( [{ productId, quantity: 10}])
    expect(create.status).to.be.equal(200)
  })

  it('caso o id esteja incorreto retorne um erro', async() => {
    const message = 'Wrong product ID or invalid quantity'
    const create = await salesService.createSales( 'saasda', 10)
    expect(create.status).to.be.equal(422)
    expect(create.message).to.be.equal(message)
  })

  it('é possivel listar todas as vendas', async() => {
    const allSales = await salesService.getAllSales()
    expect(allSales.status).to.be.equal(200)
  })

  it('é possivel localizar a venda pelo id', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const productId = _id.toString()
    const { info } = await salesService.createSales( [{ productId, quantity: 10}])
    const id = info._id.toString()
    const product = await servicesSales.getById(id)
    expect(product.status).to.be.equal(200)
  })

  it('se o id estiver incorreto, retorne um erro', async() => {
    const message = 'Sale not found'
    const product = await salesService.getById('sasada')
    expect(product.status).to.be.equal(404)
    expect(product.message).to.be.equal(message)
  })

  it('é possivel atualizar uma venda pelo id', async() => {
    const { _id } = await productsModel.findtByName('Escudo do Capitão América')
    const productId = _id.toString()
    const { info } = await salesService.createSales( [{ productId, quantity: 10}])
    const id = info._id.toString()
    const update = await salesService.updateSales( [{ productId, quantity: 21 }], id)
    expect(update.status).to.be.equal(200)
  })

  it('Se o id estiver incorreto, retorne "null"', async() => {
    const product = await salesService.updateSales('sasada')
    expect(product.status).to.be.equal(200)
    expect(product.info).to.be.equal(null)
  })

  it('é possivel deletar uma venda pelo id', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const productId = _id.toString()
    const { info } = await salesService.createSales( [{ productId, quantity: 10}])
    const id = info._id.toString()
    const deleted = await salesService.deleteSales( id )
    expect(deleted.status).to.be.equal(200)
  })

}) 