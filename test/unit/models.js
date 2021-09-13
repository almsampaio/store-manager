const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');

const ProductModel = require('../../models/ProductModel');

// CREATE PRODUCT

describe('Testando a função `create` do model ProductModel', () => {
  let connectionMock;

  const payloadProduct = {
    "name": "Produto do Batista",
    "quantity": 100,
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

describe('Testando a função `getAll` do model ProductModel', () => {
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

// getById Product

describe('Testando a função `getById` do model ProductModel', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;
  const DB_NAME = 'StoreManager';

  const ID_EXAMPLE = '604cb554311d68f491ba5781';
  const ID_EXAMPLE_INVALID = '1';

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
     .connect(URLMock, {
       useNewUrlParser: true,
       useUnifiedTopology: true
     })
     .then((conn) => conn.db(DB_NAME));

     sinon.stub(mongoConnection, 'getConnection')
     .resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quando não existe um produto para o ID informado ou ele é inválido', () => {
    it('retorna `null` para ID válido inexistente', async () => {
      const response = await ProductModel.getById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });

    it('retorna `null` para ID inválido', async () => {
      const response = await ProductModel.getById(ID_EXAMPLE_INVALID);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto para o ID informado', () => {
    before(async () => {
      const moviesCollection = await connectionMock.collection('products');
      await moviesCollection.insertOne({
        _id: ObjectId(ID_EXAMPLE),
        name: 'Example Product',
        quantity: 1,
      });
    });

    it('retorna um objeto', async () => {
      const response = await ProductModel.getById(ID_EXAMPLE);

      expect(response).to.be.an('object');
    });

    it('o objeto retornado possui as keys `_id`, `name` e `quantity`', async () => {
      const response = await ProductModel.getById(ID_EXAMPLE);

      expect(response).to.include.all.keys('_id', 'name', 'quantity');
    });
  });
});

// update Product

describe('Testando a função `getById` do model ProductModel', () => {
  
});