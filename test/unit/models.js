const sinon = require('sinon')
const { expect } = require('chai')
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connection = require('../../models/connection')
const ProductModel = require('../../models/Product')

const DB_NAME = 'StoreManager';

describe('Insere um novo produto no BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct)

      expect(response).to.be.a('object')
    })

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductModel.create(payloadProduct)

      expect(response).to.have.a.property('_id')
    })
  });
});

describe('Busca por produtos no BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando busca por todos retorna um array', () => {
    it('retorna um array', async () => {
      const response = await ProductModel.getAll()

      expect(response).to.be.an('array')
    })
  });

  describe('quando busca por id retorna o produto daquele id', () => {
    it('retorna o produto', async () => {
      const { _id } = await ProductModel.create(payloadProduct);
      const response = await ProductModel.getById(_id)

      expect(response).to.have.property('_id')
      expect(response).to.have.property('name')
      expect(response).to.have.property('quantity')
    })
  });
});

describe('Atualiza um produto no BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é atualizado com sucesso', () => {
    it('retorna um objeto', async () => {
      const responseCreate = await ProductModel.create(payloadProduct)
      const responseUpdate = await ProductModel.update({
        ...payloadProduct,
        id: responseCreate._id
      })

      expect(responseUpdate).to.be.a('object')
    })
  });
});

describe('Deleta um produto no BD (model)', () => {
  let connectionMock

  const payloadProduct = {
    name: 'Example Product',
    quantity: 10
  }

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((conn) => conn.db(DB_NAME));


    sinon.stub(connection, 'getConnection').resolves(connectionMock);
  })

  after(async () => {
    connection.getConnection.restore()
  })

  describe('quando é deletado com sucesso', () => {
    it('retorna um objeto', async () => {
      const responseCreate = await ProductModel.create(payloadProduct)
      const responseUpdate = await ProductModel.deleteById(responseCreate._id)

      expect(responseUpdate).to.be.a('object')
    })
  });
});

