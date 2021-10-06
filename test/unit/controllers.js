const connection = require('../../db');
const productController = require('../../controllers/product')
const saleController = require('../../controllers/sale')
const { it, describe, beforeEach, afterEach } = require('mocha');
const sinon = require('sinon');
const productServ = require('../../services/product');
const saleServ = require('../../services/sales');

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

describe('Controller de produtos', () => {
  it('[POST] - Deve ser possível cadastrar um novo produto', async () => {
    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      body: {
        name: "product_name",
        quantity: 2
    }}
    await productController.create(request, mReply)
    sinon.assert.calledWith(mReply.status, 201);
  })
  it('[POST] - Deve ser possível retornar um erro em caso de dados do produto invalido', async () => {
    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      body: {
        name: "product_name",
        quantity: 2
    }}
    await productController.create(request, mReply)
    try {
      await productController.create(request, mReply)
    } catch (error) {
      sinon.assert.calledWith(mReply.status, 422);
    }
  })
  it('[GET] - Deve ser possível listar todos os produtos', async () => {
    const request = {
      params: ''
    }
    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.list(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
  it('[GET] - Deve ser possível retornar um erro em caso de um id invalido', async () => {
    const product = await productServ.createService({
      name: "product_name",
      quantity: 2
    })

    await productServ.deleteProductService(product._id)
    const request = {
      params: {
        id: product._id
      }
    }
    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.list(request, mReply)
    sinon.assert.calledWith(mReply.status, 422);
  })
  it('[PUT] - Deve ser possível editar um produto', async () => {
    const product = await productServ.createService({
      name: "product_name",
      quantity: 2
    })

    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      params: {
        id: product._id
      },
      body: {
        name: "product_name",
        quantity: 2
    }}
    await productController.update(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
  it('[DELETE] - Deve ser possível deletar um produto', async () => {
    const product = await productServ.createService({
      name: "product_name",
      quantity: 2
    })

    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      params: {
        id: product._id
      }
    }
    await productController.remove(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
})

describe('Controller de vendas', () => {
  it('[POST] - Deve ser possível cadastrar uma nova venda', async () => {
    const product = await productServ.createService({
      name: "product_name",
      quantity: 2
    })
    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      body: [{
        productId: product._id,
        quantity: 1
      }]
    }
    await saleController.create(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
  it('[GET] - Deve ser possível listar todas as vendas', async () => {
    const request = {
      params: ''
    }
    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await saleController.list(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
  it('[PUT] - Deve ser possível editar uma venda', async () => {
    const product = await productServ.createService({
      name: "product_name",
      quantity: 2
    })
    const sale = await saleServ.createService([{
      productId: product._id,
      quantity: 1
    }])

    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      params: {
        id: sale._id
      },
      body: [{
        productId: product._id,
        quantity: 4
      }]
    }
    await saleController.update(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
  it('[DELETE] - Deve ser possível deletar uma venda', async () => {
    const product = await productServ.createService({
      name: "product_name",
      quantity: 2
    })

    const sale = await saleServ.createService([{
      productId: product._id,
      quantity: 1
    }])

    const mReply = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const request = {
      params: {
        id: sale._id
      }
    }
    await saleController.remove(request, mReply)
    sinon.assert.calledWith(mReply.status, 200);
  })
})
