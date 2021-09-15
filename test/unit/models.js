const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductsModel = require('../../models/productModel');

describe('Insere um novo produto no Banco de dados', () => {
  let connectionMock;
  const product = {
    name: 'produtoExemplo',
    quantity: 999,
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
        .connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then((conn) => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock)
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });  

  describe('Quando for inserido com sucesso', async () => {
    it('Retorna um objeto', async () => {
      const response = await ProductsModel.create(product);

      expect(response).to.be.a('object');
    });
    it('O objeto tem todas as propriedades do produto inclusive o ID criado', async () => {
      const response = await ProductsModel.create(product);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity')
    });
    it('O objeto tem as informacoes exatas do produto', async () => {
      await ProductsModel.create(product);
      const productCreated = await connectionMock.collection('products')
        .findOne({ name: product.name, quantity: product.quantity });
      
      expect(productCreated).to.be.not.null;
    });
  });
});

describe('Testa o metodo findOneByName', () => {
  let connectionMock;
  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
        .connect(URLMock, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then((conn) => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock)
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });  
  it('Testa se o metodo findOneByName retorna corretamente quando nao encontra ', async () => {
    const response = await ProductsModel.findOneByName('nome nao existente');

    expect(response).to.be.equal(null);
  });
  it('Testa se o metodo findOneByName retorna corretamente quando encontra', async () => {
    const produto = {
      name: 'produtoExemplo',
      quantity: 999,
    };
    await ProductsModel.create(produto);
    const response = await ProductsModel.findOneByName('produtoExemplo');

    expect(response.name).to.be.equal(produto.name);
    expect(response.quantity).to.be.equal(produto.quantity);
  });
});

describe('Busca todos os produtos no DB', () => {
  describe('Quando nao existe nenhum produto cadastrado', () => {
    it('retorna um array', () => {
      const produto = await ProductsModel.getAll();
      expect(produto).to.be.a('array');
    })
  })
})