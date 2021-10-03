const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');

const connection = require('../../models/connection');
const ProductsModel = require('../../models/Products');

const SalesModel = require('../../models/Sales');

describe('Insere um produto no banco', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));

      sinon.stub({ connection }, 'connection').resolves(connectionMock);
  });

  after(() => {
    connection().restore;
  });

  describe('Quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductsModel.create('nome correto', 5);
      expect(await response).to.have.a('object');
    });
    it('tal objeto possui o "_id, name e quantity" do novo produto', async () => {
      const response = await ProductsModel.create('nome correto', 5);
      expect(await response).to.be.a.property('_id')
      expect(await response).to.be.a.property('name')
      expect(await response).to.be.a.property('quantity')
    });
    it('o produto deve ser cadastrado', async () => {
      const productCreated = await ProductsModel.create('nome correto', 5);
      const productRes = await ProductsModel.getProductId(productCreated._id)
      expect(productRes).to.be.not.null;
    })
  })
});

describe('Retorna produtos do banco de dados', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));

      sinon.stub({ connection }, 'connection').resolves(connectionMock);
  });
  after(() => {
    connection().restore;
  });

  it('retorna um array de produtos do banco de dados', async () => {
    const response = await ProductsModel.getAllProducts();
    expect(response).to.be.a('array');
  });
  it('retorna apenas o produto do "_id" especifico', async () => {
    const productId = await ProductsModel.create('produto criado', 5);
    const response = await ProductsModel.getProductId(productId._id);
    expect(response.name).to.be.equals('produto criado');
  });
});

describe('atualiza um produto', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));

      sinon.stub({ connection }, 'connection').resolves(connectionMock);
  });
  after(() => {
    connection().restore;
  });

  it('verifica se o produto foi atualizado', async () => {
    const productCreate = await ProductsModel.create('produto criado', 5);
    await ProductsModel.updateProduct('nome atualizado', 5, productCreate._id);
    const productUpdated = await ProductsModel.getProductId(productCreate._id); 
    expect(productUpdated.name).to.be.equals('nome atualizado');
  });
});

describe('deleta o produto', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));

      sinon.stub({ connection }, 'connection').resolves(connectionMock);
  });
  after(() => {
    connection().restore;
  });

  it('deleta o produto', async () => {
    const productCreate = await ProductsModel.create('produto criado', 5);
    await ProductsModel.deleteProduct(productCreate._id);
    const getProductDeleted = await ProductsModel.getProductId(productCreate._id);
    expect(getProductDeleted).to.be.null;
  });
});

describe('cadastratar uma venda', () => {
  let connectionMock;

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));

      sinon.stub({ connection }, 'connection').resolves(connectionMock);
  });
  after(() => {
    connection().restore;
  });

  const payloadSale = {
    itensSold : {
      productId: '6159e78e6c706d5c8c4456a8',
      quantity: 5,
    },
  }

  it('cadastrar uma venda com sucesso', async () => {
    const sale = await SalesModel.create(payloadSale.itensSold);
    expect(sale).to.be.a('object');
    const saleResgistr = SalesModel.getById(sale._id);
    expect(saleResgistr).to.be.not.null;

  });

  it('retorna todas as vendas', async () => {
    const sales = await SalesModel.getAll();

    expect(sales).to.be.a('array');
  })
});
