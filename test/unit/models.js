const connection = require('../../db');
const { it, describe, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const Product = require('../../models/product')
const Sale = require('../../models/sale')
const { expect } = require('chai');

let db;

beforeEach(async () => {
  db = await connection();
  await db.collection('products').deleteMany({});
  await db.collection('sales').deleteMany({});
});

afterEach(async () => {
  await db.collection('products').deleteMany({});
  await db.collection('sales').deleteMany({});
  sinon.restore();
});

describe('Model de produtos', () => {
  it('[Criar] - Deve ser possível cadastrar um novo produto', async () => {
    const data = {
        name: "product_name",
        quantity: 2
    }
    const product = await Product.create(data)
    expect(product).to.be.exist
  })
  it('[Pegar por nome] - Deve ser possível pegar um produto pelo seu nome', async () => {
    const data = {
        name: "product_name",
        quantity: 2
    }
    await Product.create(data)
    const product = await Product.findByName(data.name)
    expect(product).to.be.exist
  })
  it('[Listar] - Deve ser possível listar todos os produtos', async () => {
    const data = {
        name: "product_name",
        quantity: 2
    }
    const data2 = {
      name: "product_name2",
      quantity: 2
  }
    const prod1 = await Product.create(data)
    const prod2 = await Product.create(data2)
    const products = await Product.getProducts()
    expect(products).to.deep.equal({ products: [prod1, prod2] })
  })
  it('[Listar] - Deve ser possível pegar um produto específico', async () => {
    const data = {
        name: "product_name",
        quantity: 2
    }
    const data2 = {
      name: "product_name2",
      quantity: 2
  }
    const prod1 = await Product.create(data)
    await Product.create(data2)
    const product = await Product.getProduct(prod1._id)
    expect(product).to.be.exist
  })
  it('[Editar] - Deve ser possível editar um produto', async () => {
    const data = {
        name: "product_name",
        quantity: 2
    }
    const prod = await Product.create(data)
    const newData = {
      name: "product_edit",
      quantity: 2
    }
    await Product.updateProduct(prod._id, newData)
    const productEdited = await Product.getProduct(prod._id)
    expect(productEdited).to.deep.equal({ _id: prod._id, ...newData})
  })
  it('[Deletar] - Deve ser possível deletar um produto', async () => {
    const data = {
        name: "product_name",
        quantity: 2
    }
    const prod = await Product.create(data)
    await Product.deleteProduct(prod._id)
    const productDeleted = await Product.getProduct(prod._id)
    expect(productDeleted).to.be.null
  })
})

describe('Model de vendas', () => {
  it('[Criar] - Deve ser possível cadastrar uma nova venda', async () => {
    const product = await Product.create({
      name: "product_name",
      quantity: 2
  })
    const data = { itensSold: [{
      productId: product._id,
      quantity: 1
    }]}
    const sale = await Sale.create(data)
    expect(sale).to.be.exist
  })
  it('[Listar] - Deve ser possível listar todas as vendas', async () => {
    const product = await Product.create({
      name: "product_name",
      quantity: 2
    })
    const data = { itensSold: [{
      productId: product._id,
      quantity: 1
    }]}
    const data2 = { itensSold: [{
      productId: product._id,
      quantity: 1
    }]}
    const sale1 = await Sale.create(data)
    const sale2 = await Sale.create(data2)
    const sales = await Sale.getSales()
    expect(sales).to.deep.equal({ sales: [sale1, sale2] })
  })
  it('[Listar] - Deve ser possível pegar uma venda específica', async () => {
    const product = await Product.create({
      name: "product_name",
      quantity: 2
    })
    const data = { itensSold: [{
      productId: product._id,
      quantity: 1
    }]}
    const response = await Sale.create(data)
    const sale = await Sale.getSale(response._id)
    expect(sale).to.be.exist
  })
  it('[Editar] - Deve ser possível editar um produto', async () => {
    const product = await Product.create({
      name: "product_name",
      quantity: 2
    })
    const data = { itensSold: [{
      productId: product._id,
      quantity: 1
    }]}

    const response = await Sale.create(data)

    const newData = { itensSold: [{
      productId: product._id,
      quantity: 4
    }]}

    await Sale.updateSale(response._id, newData)
    const saleEdited = await Sale.getSale(response._id)
    expect(saleEdited).to.be.exist
  })
  it('[Deletar] - Deve ser possível deletar uma venda', async () => {
    const product = await Product.create({
      name: "product_name",
      quantity: 2
    })
    const data = { itensSold: [{
      productId: product._id,
      quantity: 1
    }]}

    const response = await Sale.create(data)

    await Sale.deleteSale(response._id)
    const saleDeleted = await Sale.getSale(response._id)
    expect(saleDeleted).to.be.null
  })
})
