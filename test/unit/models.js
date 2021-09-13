const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');

const ProductModel = require('../../models/ProductModel');

// CREATE PRODUCT

describe('Insere um novo produto no BD - camada model', () => {
  let connectionMock;

  const payloadProduct = {
    "name": "Produto do Batista",
    "quantity": 100
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();
    const DB_NAME = 'StoreManager';

    connectionMock = await MongoClient
    .connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn) => conn.db(DB_NAME));
  
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "_id" do novo produto inserido', async () => {
      const response = await ProductModel.create(payloadProduct);

      expect(response).to.have.a.property('_id');
    });

    it('deve existir um produto com o nome e a quantidade cadastrada', async () => {
      await ProductModel.create(payloadProduct);

      const movieCreated = await connectionMock.collection('products').findOne({name: payloadProduct.name, quantity: payloadProduct.quantity});

      expect(movieCreated).to.deep.include(payloadProduct);
    });
  });
});


// getAll PRODUCT

describe('Busca todos os produtos no BD - model', () => {
  let connectionMock; 
  const DBServer = new MongoMemoryServer();
  const DB_NAME = 'StoreManager';

  before( async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME));

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quanto não existe nenhum produto cadastrado', () => {
    it('retorna o object "products" contento um array', async () => {
      const { products } = await ProductModel.getAll();

      expect(products).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const { products } = await ProductModel.getAll();
      
      expect(products).to.be.empty;
    });
  });

  describe('quanto existem produtos cadastrados', () => {
    const expectedProduct = {
      _id: '604cb554311d68f491ba5781',
      name: 'Produto Silva',
      quantity: 1,
    };

    const collection = 'products';

    before(async () => {
      await connectionMock.collection(collection).insertOne({ ...expectedProduct });
    });

    after(async () => {
      await connectionMock.collection(collection).drop();
    });

    it('retorna o object "products" contento um array', async () => {
      const { products } = await ProductModel.getAll();

      expect(products).to.be.an('array');
    });

    it('retorna um array não vazio', async () => {
      const { products } = await ProductModel.getAll();

      expect(products).to.not.be.empty;
    });

    it('o array retornado possui dados do tipo objeto', async () => {
      const { products } = await ProductModel.getAll();
      const [firstProduct] = products;

      expect(firstProduct).to.be.an('object');
    });

    it('todos os objetos possuem os atributos "id", "name" e "quantity"', async () => {
      const { products } = await ProductModel.getAll();
      const [firstProduct] = products;

      expect(firstProduct).to.include.all.keys(['_id', 'name', 'quantity'])
    });

    it('o produto cadastrado está no array', async () => {
      const { products } = await ProductModel.getAll();
      const [{ _id, name, quantity }] = products;

      expect({ _id, name, quantity }).to.deep.equal(expectedProduct);
    });
  });
});
