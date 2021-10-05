const { expect } = require('chai');
const connection = require('../../models/connection')
const salesService = require('../../services/Sales')
const serviceProducts = require('../../services/Products')
const productsModel = require('../../models/Products');
const { test } = require('mocha');

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
    const  info = await productsModel.create('productName', 10)
    console.log(info);
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
    const { _id } = await productsModel.create('productName', 10)
    console.log(_id);
    const update = await serviceProducts.updateProduct(_id, 'productName', )
    expect(update.status).to.be.equal(200)
  })

  it('is possivel deletar um produto', async() => {
    const {_id: id} = await productsModel.create('productName', 10)
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
    console.log(_id);
    const productId = _id.toString()
    const create = await salesService.createSales( [{ productId, quantity:10 }])
    expect(create.status).to.be.equal(200)
  })


  it('é possivel listar todas as vendas', async() => {
    const allSales = await salesService.getAllSales()
    expect(allSales.status).to.be.equal(200)
  })

  it('é possivel localizar a venda pelo id', async() => {
      const {_id: productId } = await productsModel.findByName('Escudo do Capitão América')
    const {data}  = await salesService.createSales( [{ productId, quantity: 10}])
    console.log(data);
    const product = await salesService.getById(data._id)
    expect(product.status).to.be.equal(200)
  })

  it('se o id estiver incorreto, retorne um erro', async() => {
    const message = 'Sale not found'
    const product = await salesService.getById('sasada')
    expect(product.status).to.be.equal(404)
    expect(product.message).to.be.equal(message)
  })

  it('é possivel atualizar uma venda pelo id', async() => {
    const { _id: productId } = await productsModel.findByName('Escudo do Capitão América')
    const { data } = await salesService.createSales( [{ productId, quantity: 10}])
    const update = await salesService.updateSales( [{ productId, quantity: 21 }], data._id)
    expect(update.status).to.be.equal(200)
  })

  it('Se o id estiver incorreto, retorne "null"', async() => {
    const product = await salesService.updateSales('sasada')
    expect(product.status).to.be.equal(200)
    expect(product.data).to.be.equal(null)
  })

  it('é possivel deletar uma venda pelo id', async() => {
    const { _id: productId } = await productsModel.findByName('Escudo do Capitão América')
    const { data } = await salesService.createSales( [{ productId, quantity: 10}])
    const deleted = await salesService.deleteSales( data._id )
    expect(deleted.status).to.be.equal(200)
  })

}) 