const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/Products');
const salesModel = require('../../models/Sales');

describe('testando camada models', () => {
  beforeEach( async () => {
    const db = await connection()
    await db.collection('products').deleteMany({});
    await db.collection('sales').deleteMany({});
    const products = [{ name: 'Martelo de Thor', quantity: 10 },
    { name: 'Traje de encolhimento', quantity: 20 },
    { name: 'Escudo do Capitão América', quantity: 30 }];
    await db.collection('products').insertMany(products);
  });

  it('é possivel criar produtos', async() => {
    const create = await productsModel.create('productName', 10)
    const allProducts = await productsModel.getAll()

    expect(create).to.have.a.property('_id')
    expect(create).to.be.a('object')
    expect(allProducts).to.be.a('array')
    expect(allProducts.length).to.be.equal(4)
  });

  it('é possivel listar todos os produtos', async() => {
    const allProducts = await productsModel.getAll()
    expect(allProducts.length).to.be.equal(3)
    expect(allProducts).to.be.a('array')
  });

  it(' é possivel atualizar um produto', async() => {
    const namee = 'Martelo';
    const quantityy = 35;
    const { _id } = await productsModel.findByName('Martelo de Thor')
    const id = _id.toString()
    await productsModel.updateProduct(id, namee, quantityy)
    const updateProduct = await productsModel.getById(id)
    console.log(updateProduct);
    expect(updateProduct).to.be.a('object')
    expect(updateProduct.name).to.be.equal('Martelo')
    expect(updateProduct.quantity).to.be.equal(35)
  });

  it('é possivel excluir um produto', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const id = _id.toString()
    await productsModel.deleteProduct(id)
    const allProducts = await productsModel.getAll()
    const updateProduct = await productsModel.getById(id)
    expect(updateProduct).to.be.equal(null)
    expect(allProducts.length).to.be.equal(2)
  });

  it('é possivel realizar uma busca pelo nome', async() => {
    const product = await productsModel.findByName('Traje de encolhimento');
    expect(product).to.be.a('object');
    expect(product.quantity).to.be.equal(20);
  });

  it('é pissivel criar uma venda', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const idProduct = _id.toString()
    const sale = await salesModel.createSales({idProduct, quantity: 10})
    const allSales = await salesModel.getAllSales()
    expect(allSales.length).to.be.equal(1)
    expect(sale).to.have.a.property('itensSold');
  });


  it('é possivel atualizar uma venda', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const productIdStr = _id.toString()
    const create = await salesModel.createSales({ productIdStr, quantity: 10})
    const id = create._id.toString()
    const retorno = await salesModel.updateSales(id, {productIdStr, quantity: 1})
    
    expect(retorno).to.be.a('object')
    expect(retorno.itensSold.quantity).to.be.equal(1)
  });

  it('é possivel deletar uma venda', async() => {
    const { _id } = await productsModel.findByName('Escudo do Capitão América')
    const productId = _id.toString()
    const create = await salesModel.createSales({ productId, quantity: 10})
    const id = create._id.toString()
    await salesModel.deleteSales(id)
    const sale = await salesModel.getById(id)

    expect(sale).to.be.equal(null)
  });

})
