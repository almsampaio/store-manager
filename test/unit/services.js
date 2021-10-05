const { createService, listProductService,updateProductService, deleteProductService } = require('../../services/product');
const saleService = require('../../services/sales');
const connection = require('../../db');
const { it, describe, beforeEach, afterEach } = require('mocha');
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
});

describe('Serviço de produtos', () => {
  it('[CRIAR] - Deve ser possível cadastrar um novo produto', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const response = await createService(data)
    const product = await db.collection('products').findOne({ name: response.name })
    expect(product).to.be.exist
  })
  it('[CRIAR] -Deve retornar um erro se já existir um produto com o mesmo nome', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    await createService(data)
    try {
      await createService(data)
    } catch (error) {
      expect(error.message).to.equal('Product already exists');
    }
  })
  it('[LISTAR] - Deve ser possível listar todos os produtos criados', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const data2 = {
      name: "product_name2",
      quantity: 2
    }
    await createService(data)
    await createService(data2)
    const response =  await listProductService()
    expect(response).to.be.not.empty;
  })
  it('[LISTAR] - Deve ser possível pegar um produto específico', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const data2 = {
      name: "product_name2",
      quantity: 2
    }
    const produto1 = await createService(data)
    await createService(data2)
    const response =  await listProductService(produto1._id)
    expect(response).to.be.exist;
  })
  it('[LISTAR] - Deve retornar um erro se o id do produto for inválido', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const data2 = {
      name: "product_name2",
      quantity: 2
    }
    const product = await createService(data)
    await createService(data2)
    await db.collection('products').deleteMany({});
    try {
    await listProductService(product._id)
    } catch (error) {
    expect(error.message).to.equal('Wrong id format');
    }
  })
  it('[EDITAR] - Deve ser possível editar um produto', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const editedData = {
      name: "product_edited",
      quantity: 2
    }
    const product = await createService(data)
    const editedProduct = await updateProductService(product._id, editedData)
    const productData = await listProductService(product._id)
    expect(productData).to.deep.equal(editedProduct);
  })
  it('[EDITAR] - Deve retornar erro se o id do produto for inválido', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const product = await createService(data)
    await db.collection('products').deleteMany({});
    try {
    await updateProductService(product._id)
    } catch (error) {
      expect(error.message).to.equal('Wrong id format');
    }
  })
  it('[DELETAR] - Deve ser possível deletar um produto', async () => {
    const data = {
      name: "product_name",
      quantity: 2
    }
    const product = await createService(data)
    await deleteProductService(product._id)
    const products = await listProductService()
    expect(products.products).to.be.empty;
  })
})


describe('Serviço de vendas', () => {
  it('[CRIAR] - Deve ser possível cadastrar uma nova venda', async () => {
    const product = await createService({
      name: "product_name",
      quantity: 2
    })
    const data = [{
      productId: product._id,
      quantity: 1
    }]
    const response = await saleService.createService(data)
    const sale = await db.collection('sales').findOne({ _id: response._id })
    expect(sale).to.be.exist
  })
  it('[LISTAR] - Deve ser possível listar todas as vendas criadas', async () => {
    const product = await createService({
      name: "product_name",
      quantity: 2
    })
    const data = [{
      name: product._id,
      quantity: 2
    }]
    const data2 = [{
      name: product._id,
      quantity: 2
    }]
    const sale1 = await saleService.createService(data)
    const sale2 = await saleService.createService(data2)
    const response =  await saleService.listSalesService()
    expect(response.sales).to.deep.equal([sale1, sale2]);
  })
  it('[LISTAR] - Deve ser possível pegar uma venda específica', async () => {
    const product = await createService({
      name: "product_name",
      quantity: 2
    })
    const data = [{
      name: product._id,
      quantity: 2
    }]
    const data2 = [{
      name: product._id,
      quantity: 2
    }]
    const sale1 = await saleService.createService(data)
    await saleService.createService(data2)
    const response =  await saleService.listSalesService(sale1._id)
    expect(response).to.be.exist
  })
  it('[DELETAR] - Deve ser possível deletar uma venda', async () => {
    const product = await createService({
      name: "product_name",
      quantity: 2
    })
    const data = [{
      name: product._id,
      quantity: 2
    }]
    const sale1 = await saleService.createService(data)
    await saleService.deleteSaleService(sale1._id)
    const sales = await saleService.listSalesService()
    expect(sales.sales).to.be.empty;
  })
})
